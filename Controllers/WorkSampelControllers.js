const sharp = require('sharp');
const WorkSampel = require('../ModelsControllers/WorkSampelModels');
const ApiFeacher = require('../Utils/ApiFeacher');
const {CatchAsync} = require('../Utils/CatchAsync');
const factory =require('./FactoryControllers');
const fs = require('fs')

exports.SaveImg=CatchAsync(async (req,res,next)=>{
            console.log(req.body)
        if(!req.body.Img) next();
 
      const filename = `worksampel-${Date.now()}-v2.jpeg`;
        
        const fl= req.body.Img.split(';base64,').pop();
        let imgBuffer = Buffer.from(fl, 'base64');
            
      await sharp(imgBuffer).jpeg({ quality: 30 })
      .resize(200, 200)
      .toFile(`public/WorkSampelimg/${filename}`)
      .then(data => {
          console.log('normal: ')
      })
      .catch(err => console.log(`downisze issue ${err}`))

      req.body.Image = filename
    next();
})

exports.WorkSpacePost= CatchAsync(async (req, res,next)=>{
    console.log(req.user)
            
            const switcharr= ['Registrationwork','Advocacy', 'ExpertofJustice', 'endofwork', 'lisense'];
           let sampel;
            if(!switcharr.includes(req.body.Tab)){
                if(!req.body.Image)throw( 'not exist img')
            sampel= await WorkSampel.create(req.body)
            }else if(switcharr.includes(req.body.Tab)){
                const fn= await WorkSampel.find({Tab: req.body.Tab});
                console.log(fn)
                if(fn.length === 0){
                   sampel= await WorkSampel.create(req.body)
                }else if(fn.length > 0){
                  const bnd= await WorkSampel.updateOne({Tab: req.body.Tab},req.body);
                  console.log(bnd)
                }
            }
            console.log(sampel,'vaki')
            // await WorkSampel.deleteMany()
          
 res.status(201).json({
                status: 'succes',
            })
        
           
});

exports.GetImg=CatchAsync(async(req, res, next)=>{

            const worksampel= new ApiFeacher( WorkSampel.find(), req.query).paginate().filter();
            // console.log(WorkSampel.find(),'iosauihdasui')
            const ws=await worksampel.data;
                
           console.log(ws)
             ws.map(mp=>{
                 if(mp.Image){
                    const kl= fs.readFileSync(`public/WorkSampelimg/${mp.Image}`,'base64');
                    mp.Image = kl}
            });
                
            res.status(200).json({
                status: 'succes',
                data: ws,
            })
})

 exports.WorkSampelDelete= factory.DeleteOneData(WorkSampel);