// src/app/models/Schedule.js
import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater'; // Import

mongoose.plugin(slug); // Thêm plugin
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    band: { type: Schema.Types.ObjectId, ref: 'Band' },
    venue: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String },
    event: { type: String },
    title: { type: String, require: true }, // Thêm trường title
    description: { type: String },
    image: { type: String },
    slug: { type: String, slug: 'title', unique: true },  // Thêm, slug từ title, unique
},
    {
        timestamps: true
    });

const Schedule = mongoose.model('Schedule', ScheduleSchema);
export default Schedule;