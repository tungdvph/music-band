// src/app/models/Schedule.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    band: { type: Schema.Types.ObjectId, ref: 'Band' },
    venue: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String },
    //Các trường khác
},
    {
        timestamps: true
    });

const Schedule = mongoose.model('Schedule', ScheduleSchema);
export default Schedule;