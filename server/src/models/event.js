const { Schema, default: mongoose } = require("mongoose");

const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    startTime: { type: Date },
    endTime: { type: Date },
    
    // School-specific fields
    eventType: {
        type: String,
        enum: [
            'Exams', 
            'Holiday', 
            'ECA', 
            'Events'
        ]
    },
    department: {
        type:  mongoose.Schema.Types.ObjectId,
         ref: "Subject"
    },
    gradeLevels: [ {
        type:  mongoose.Schema.Types.ObjectId,
         ref: "Class"
    }],
    location: {
        type: String,
        trim: true
    },
    classroom: {
        type: String,
        trim: true
    },
    requiredMaterials: [{ type: String }],
    organizedBy: {
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher'
        },
        club: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Club'
        }
    },
    registrationRequired: {
        type: Boolean,
        default: false
    },
    maxParticipants: {
        type: Number,
        min: 0
    },
    registrationDeadline: { type: Date },
    isOpenToParents: {
        type: Boolean,
        default: false
    },
    additionalNotes: { type: String },
    status: {
        type: String,
        enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
        default: 'Upcoming'
    }
}, {
    timestamps: true
});




const Event = mongoose.model('Event', eventSchema);
module.exports = Event;