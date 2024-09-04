import { cloud, launch, tasks ,track  } from "../../public/images";
import { 

    collab, 
    speed,
    transparancy, 
    cost,

} from '../../public/images'

import { 
    facebook, 
    instagram, 
    twitter, 
} from '../../public/icons/index'



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


export const footerLinks = [
  {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Payment policy", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "zeynkara91@gmail.com", link: "mailto:zeynkara91@gmail.com" },
        ],
    },
];


export const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
];


export const postData = [
    { 
        date: 'posted 1 hour ago', 
        title: "I need someone to center a div for me (urgent)",
        position: "Front-End Developer", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus arcu lorem, luctus non blandit tincidunt, vulputate a diam. Aliquam erat volutpat. Suspendisse laoreet, nisl eget viverra venenatis, est ex luctus nulla, ut pulvinar augue augue vitae mi. Vivamus porttitor pharetra tellus quis consectetur. ",
        difficulty: "Hard",
    }
]