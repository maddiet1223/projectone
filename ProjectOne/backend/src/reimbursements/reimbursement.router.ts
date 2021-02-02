import Express from 'express';
import logger from '../log';
import reimbursementService from './reimbursement.service';


const router = Express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    reimbursementService.getReimbursements().then((reimbursements) => {
        res.send(JSON.stringify(reimbursements));
    });
});

/*
router.get('/:id', function(req, res, next) {
    reimbursementService.getReimbursement(req.params.id).then((rest)=>{
        res.send(JSON.stringify(rest));
    });
})*/

//get reimbursement by employee name(working)
router.get('/:id', function(req, res, next) {
    console.log("in employee router"+req.params.id);
     reimbursementService.getReimbursementsByName(req.params.id).then((reimb)=>{
        console.log("in router for employee"+reimb);
        res.send(JSON.stringify(reimb));
    });
})


//get reimbursement for approaval by supervisor
router.get('/sup/pending', function(req, res, next) {
    console.log("In express router: "+req.params.id);
     reimbursementService.getReimbursementsBySupervisor().then((reimb)=>{
        console.log("In express roter, reimb is: "+reimb);
        res.send(JSON.stringify(reimb));
    });
})


router.post('/addreimbursement', (req, res, next) => {
    logger.debug(req.body);
    reimbursementService.addReimbursement(req.body).then((data)=> {
        logger.debug(data);
        res.sendStatus(201); // Created
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500); // Server error, sorry
    })
});

router.put('/addreimbursement', (req, res, next) => {
    logger.debug(req.body);
    reimbursementService.updateReimbursement(req.body).then((data)=> {
        res.send(data);
    })
})

//-------------------SUPERVISOR PROCESS----------------------

//supervisor approval update
router.put('/sup/approve/:id', (req, res, next) => {
    logger.debug(req.body);
    console.log('this is inside the approval cycle express router'+req.params.id);
    reimbursementService.updateSupervisorApproval(req.params.id).then((data)=> {
        res.send(data);
    })
})

//supervisor approval rejection
router.put('/sup/reject/:id', (req, res, next) => {
   // logger.debug(req.body);
    console.log('this is inside the rejection cycle express router'+req.params.id);
    reimbursementService.updateSupervisorRejection(req.params.id).then((data)=> {
        res.send(data);
    })
})

//--------------------------HOD PROCESS---------------------------------

//get reimbursements for hod approval

router.get('/hod/pending', function(req, res, next) {
    console.log("In express router: "+req.params.id);
     reimbursementService.getReimbursementsByHod().then((reimb)=>{
        console.log("In express roter, reimb is: "+reimb);
        res.send(JSON.stringify(reimb));
    });
})


//hod approval update
router.put('/hod/approve/:id', (req, res, next) => {
    logger.debug(req.body);
    console.log('this is inside the approval cycle express router'+req.params.id);
    reimbursementService.updateHodApproval(req.params.id).then((data)=> {
        res.send(data);
    })
})

//hod approval rejection
router.put('/hod/reject/:id', (req, res, next) => {
   // logger.debug(req.body);
    console.log('this is inside the rejection cycle express router'+req.params.id);
    reimbursementService.updateHodRejection(req.params.id).then((data)=> {
        res.send(data);
    })
})


//--------------------------Benco PROCESS---------------------------------

//get reimbursements for benco approval

router.get('/benco/pending', function(req, res, next) {
    console.log("In express router: "+req.params.id);
     reimbursementService.getReimbursementsByBenco().then((reimb)=>{
        console.log("In express roter, reimb is: "+reimb);
        res.send(JSON.stringify(reimb));
    });
})


//benco approval update
router.put('/benco/approve/:id', (req, res, next) => {
    logger.debug(req.body);
    console.log('this is inside the approval cycle express router'+req.params.id);
    reimbursementService.updateBencoApproval(req.params.id).then((data)=> {
        res.send(data);
    })
})

//Benco approval rejection
router.put('/benco/reject/:id', (req, res, next) => {
   // logger.debug(req.body);
    console.log('this is inside the rejection cycle express router'+req.params.id);
    reimbursementService.updateBencoRejection(req.params.id).then((data)=> {
        res.send(data);
    })
})


//--------------------------Benco final PROCESS---------------------------------

//get reimbursements for benco  final approval

router.get('/bencofinal/pending', function(req, res, next) {
    console.log("In express router: "+req.params.id);
     reimbursementService.getReimbursementsForBencoFinalApproval().then((reimb)=>{
        console.log("In express roter, reimb is: "+reimb);
        res.send(JSON.stringify(reimb));
    });
})


//benco approval update
router.put('/bencofinal/approve/:id', (req, res, next) => {
    logger.debug(req.body);
    console.log('this is inside the approval cycle express router'+req.params.id);
    reimbursementService.updateBencoFinalApproval(req.params.id).then((data)=> {
        res.send(data);
    })
})

//Benco approval rejection
router.put('/bencofinal/reject/:id', (req, res, next) => {
   // logger.debug(req.body);
    console.log('this is inside the rejection cycle express router'+req.params.id);
    reimbursementService.updateBencoFinalRejection(req.params.id).then((data)=> {
        res.send(data);
    })
})

//---------------employee proof submits---------------------------------------------------
//employee proof submission

router.get('/emp/proof', function(req, res, next) {
    console.log("In express router: "+req.params.id);
     reimbursementService.getReimbursementsByProofSubmit().then((reimb)=>{
        console.log("In express roter, reimb is: "+reimb);
        res.send(JSON.stringify(reimb));
    });
})

router.put('/empproof/submit/:id', (req, res, next) => {
    // logger.debug(req.body);
     console.log('this is inside the rejection cycle express router'+req.params.id);
     reimbursementService.updateProofSubmission(req.params.id).then((data)=> {
         res.send(data);
     })
 })


 
 

export default router;