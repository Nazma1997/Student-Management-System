const StudentAttendance = require('../models/StudentAttendance');

 const AdminAttendance = require('../models/AdminAttendance');
 const error= require('../utils/error');
const { isAfter, addMinutes } = require('date-fns');

const getAttendance = async(req, res, next) => {


       try{
          const {id} = req.params;   
        
          const adminAttendance = await AdminAttendance.findOne({id});

          if(!adminAttendance){
            throw error('Invalid Attendance ID', 400);
          }

          if(adminAttendance.status === 'COMPLETED'){
            throw error('Attendance Already Completed');
          }
             
          let attendance = await StudentAttendance.findOne({adminAttendance: id,
                   user: req.user._id
          });

          if(attendance){
            throw error('Already Register', 400);
          }


           attendance = new StudentAttendance({
            user: req.user._id,
            adminAttendance: id,
          });

          await attendance.save();
          

          return res.status(201).json(attendance);
       }catch(e){
        next(e)
       }
};


const getAttendanceStatus = async(req, res, next) => {
 try{
     
      const running = await AdminAttendance.findOne({status: 'RUNNING'});

      if(!running){
        throw error('Not Running', 400)
        }

        const started = addMinutes(new Date(running.createdAt), running.timeLimit);

        if(isAfter(new Date(), started)){
          running.status = 'COMPLETED';
          await running.save();
        }
 }catch(e){
  next(e)
 }
};



module.exports = {
  getAttendance,
  getAttendanceStatus,
}