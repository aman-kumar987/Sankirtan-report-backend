import mongoose, { Schema } from 'mongoose';
import { RDUA_Groups } from '../constants.js';

const reportSchema = Schema({
    groupName: {
        type: String,
        required: [true, "Group name field is required"],
        trim: true,
        enum: RDUA_Groups
    },

    numberOfBooksDistributed: {
        type: Number,
        required: [true, "Number of distributed books field is required"],
        min: 0
    },

    krishnaKathaPoints: {
        type: Number,
        required: [true, "Krishna katha points field is required"],
        min: 0
    },

    sankirtanPoints: {
        type: Number,
        required: [true, "Sankirtan points field is required"],
        min: 0
    },

    gaurNitaiPleasingPoints: {
        type: Number,
        required: [true, "Gaur Nitai pleasing points field is required"],
        min: 0
    },

    date: {
        type: Date,
        required: [true, "Date field is required"],
        validate: {
            validator: function(v) {
                return v <= Date.now();
            },
            message: props => `${props.value} is a future date. Date cannot be in the future!`
        }
    }
})

const Report = mongoose.model('Report', reportSchema);
export default Report;