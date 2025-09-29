import mongoose from 'mongoose';
import { type } from 'os';


const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: [ true, 'Project name must be unique' ],
    },

    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    fileTree: {
        type: Object,
        default: {}
    },
    buildCommand: {
        type: Object,
        default: {}
    },
    startCommand: {
        type: Object,
        default: {}
    },
    messages: {
        type: Array,
        default:[]
    },

})


const Project = mongoose.model('project', projectSchema)


export default Project;