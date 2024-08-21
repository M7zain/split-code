import { MdDescription } from "react-icons/md";
import { cloud, launch, tasks ,track  } from "../../public/images";
import { 

    collab, 
    speed,
    transparancy, 
    cost,

} from '../../public/images'

export const howLeft = [
    { 
        
        imgURL: cloud, 
        id: "2",
        title: "Freelancers Split Tasks", 
        description: "We match your project with skilled developers who specialize in each task, ensuring quality and efficiency", 

    },
    {
                
        imgURL: track, 
        id: "4",
        title: "Launch with Confidence", 
        description: "Receive your completed project, fully optimized and ready for deployment.", 

    }
]

export const howRight = [
    { 
        
        imgURL: tasks, 
        id: "1",
        title: "Post Your Project", 
        description: "Describe your project needs, set your budget, and let us connect you with top freelancers.", 

    },
    {
                
        imgURL: launch, 
        id: "3",
        title: "Track and Collaborate", 
        description: "Use our platform to monitor progress, communicate with your team, and make adjustments in real-time.", 

    },
]


export const cardInfo = [ 
    { 
        id: '1',
        imgURL:collab, 
        title: "Collaborative Expertise:", 
        description: "Benefit from the collective knowledge and skills of multiple developers, each focusing on what they do best."
    }, 
    { 
        id: '2',
        imgURL:speed, 
        title: "Efficiency and Speed", 
        description: "By splitting tasks among specialists, we deliver high-quality results faster."
    }, 
    { 
        id: '3',
        imgURL:transparancy, 
        title: "Transparent Workflow:", 
        description: "Our platform ensures clear communication and real-time updates, keeping you in control."
    }, 
    { 
        id: '4',
        imgURL:cost, 
        title: "Cost-Effective Solutions:", 
        description: "Benefit from the collective knowledge and skills of multiple developers, each focusing on what they do best."
    }, 
]