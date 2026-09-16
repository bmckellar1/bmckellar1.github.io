// Personal content. Original media stays in src/photos; web copies are in public/media.
export const profile = {
  name: 'Brad McKellar',
  role: 'Future Mechanical Engineer',
  photo: '/media/profile-picture-v2.webp',
  photoSize: [1254, 1254],
  photoAlt: 'Portrait of Brad McKellar',
  introduction: 'This site is a collection of my engineering projects so far. I hope you enjoy!',
  aboutTitle: 'Building a better future in healthcare.',
  about: "I believe the future of healthcare is something we build by creating technologies that help people thrive.",
  email: 'bradmckellar1@gmail.com',
  links: [{ label: 'Resume', url: '/Brad-McKellar-Resume.pdf' }],
};

// Initial stories describe the supplied media. Add your role, decisions, and
// measured results here when ready; no performance claims are assumed.
// Use section.content to place paragraph and media groups in any order.
// Existing sections with paragraphs and media still work. See Capsule below.
export const projects = [
  {
    id: 'capsule',
    title: 'Targeted Delivery Capsule',
    category: 'Biomedical design',
    summary: 'From test tubes to intestines: an exercise in iteration and experiment design.',
    image: '/media/capsule-packaged.webp',
    imageSize: [1570, 758],
    imageAlt: 'Annotated capsule prototype with its folded anchor, spool housing, and osmotic pump',
    imageFit: 'contain',
    lead: 'Bringing targeted drug delivery from bench to bedside.',
    overview: "Targeted drug delivery has the potential to change the way we treat diseases of the gut. How can we integrate various systems into a single device that works in a living creature?",
    topics: ['Product Design', 'Pharmacopeia Compliance', 'Experiment Design'],
    heroCaption: 'Targeted drug delivery capsule prototype.',
    sections: [
      {
        id: 'targeted-delivery',
        title: 'What is targeted drug delivery?',
        content: [
          { paragraphs: ["Suppose for a moment that you have Crohn's disease. Throughout your life, you develop sores in your intestine that, if left untreated, can cause necrosis and require surgical removal. There are pharmaceutical treatments that are effective, but they have side effects, and relatively little medication actually accumulates at the infected site. A house is on fire, but all you can do is rain on the neighborhood.", 
          "This device is a novel method for focusing treatment on just the site of the disease. Now we can send fire trucks to the burning house without getting any of the neighbors wet."
          ] },
          { media: [{ type: 'image', src: '/media/capsule-diagram.webp', size: [1138, 1127], alt: 'Three-part concept diagram showing capsule ingestion, anchor deployment, and tethered positioning for localized delivery. Courtesy of the Terry Research Lab at BYU.', fit: 'contain', caption: 'Three-part concept diagram showing capsule ingestion, anchor deployment, and tethered positioning for localized delivery. Courtesy of the Terry Research Lab at BYU.' }] },
          { paragraphs: [
          "This device is swallowed as a capsule. Upon entering the stomach, it splits into two components: an anchor and a payload connected by a tether. The anchor lodges itself in the pylorus while the payload continues to traverse the intestine until it reaches the end of the line. At that point, the device is fully deployed.",
          "The device can now collect data or release medication, depending on the payload. After a period of time, the anchor dissolves and the whole device is passed. With one visit to the doctor for imaging and a day of fasting with the capsule, treatment is complete."
          ] },
        ],
      },
      {
        id: 'assembly',
        title: 'Assembly',
        content: [
          { paragraphs: ["When I joined the project, we had a handful of validated components but no procedure for assembly. My first task was to develop a system to build functioning capsules every time. After a few iterations and the addition of new assembly tools, capsule manufacturing yield jumped from approximately 40% to over 90%."] },
          { media: [{ type: 'image', src: '/media/capsule-deployed-v2.webp', size: [1735, 1306], alt: 'White anchor component and dark capsule housing laid out on a wooden workbench', caption: 'Freshly assembled capsule components, ready for packing and testing.' }] },
        ],
      },
      {
        id: 'experiment-design',
        title: 'Experiment Design',
        content: [
          { paragraphs: ["Once we had an efficient manufacturing system, it was time to test. Each component of the capsule had been individually tested and validated; now it was time to test everything together. I developed an end-to-end in vitro test that simulated the GI tract from top to bottom, complete with an artificial pylorus, an artificial intestine, and simulated gastric and intestinal fluids held at 37 °C."] },
          { media: [{ type: 'image', src: '/media/capsule-deployed-v2.webp', size: [1735, 1306], alt: 'White anchor component and dark capsule housing laid out on a wooden workbench', caption: 'The anchor component and capsule housing outside the packaged configuration.' }] },
          { paragraphs: [] }, // Add your next paragraphs here.
        ],
      },
      {
        id: "the-future",
        title: "What's next?",
        content: [
          { paragraphs: ["Now that we've proved these components can work together, we are developing an in vivo test in pigs. Stay tuned!"] },
        ],
      }
    ],
  },
  {
    id: 'baloo',
    title: 'Baloo',
    category: 'Robotics',
    summary: 'A robotic platform in motion, from its physical assembly to a lifting demonstration.',
    image: '/media/baloo-lifting.webp',
    imageSize: [720, 1280],
    imageAlt: 'Baloo holding a cardboard box in the robotics workshop',
    imagePosition: '50% 49%',
    lead: 'Bringing a robotic mechanism into the physical world.',
    overview: 'Baloo brings a robot’s frame, articulated arms, and handling task together in one physical assembly. The workshop demonstration captures the platform holding a box and gives a first look at the mechanism in use.',
    topics: ['Robotic mechanisms', 'Physical integration', 'Demonstration'],
    heroCaption: 'Baloo during a lifting demonstration in the workshop.',
    heroPortrait: true,
    sections: [
      {
        id: 'assembly',
        title: 'The physical assembly',
        content: [
          { paragraphs: ['The platform combines a central frame with two articulated arms and a gripper at the end of each arm. The exposed structure makes the relationship between the frame, joints, and handled object visible.', 'This is where individual mechanisms become a complete system: the assembly has to make room for motion as well as the object it is intended to handle.'] },
        ],
      },
      {
        id: 'demonstration',
        title: 'The lifting demonstration',
        content: [
          { paragraphs: ['The recorded demonstration follows Baloo handling a cardboard box in the workshop. It documents the physical prototype in use and provides a reference for the movement of the arms and the position of the load.'] },
          { media: [{ type: 'video', src: '/media/baloo-lifting.mp4', poster: '/media/baloo-lifting.webp', portrait: true, caption: 'Workshop footage of Baloo handling a box. Use the controls to play or pause.' }] },
        ],
      },
    ],
  },
  {
    id: 'tesla-turbine',
    title: 'Tesla Turbine',
    category: 'Design & manufacturing',
    summary: 'Forgotten technology breaking 400 mph.',
    image: '/media/turbine-glamour.webp',
    imageSize: [1449, 1086],
    imageAlt: 'Tesla turbine with a machined metal frame and transparent circular housing on a workbench',
    imageFit: 'contain',
    lead: 'Learning to learn, machine, iterate, and follow through.',
    overview: "I was challenged to push the limits of our machines and build something to inspire the next generation. Here's what I made.",
    topics: ['Multi-axis Machining', 'Additive Manufacturing', 'CAD'],
    heroCaption: 'The assembled Tesla turbine, with its machined frame and transparent housing.',
    sections: [
      {
        id: 'challenge',
        title: 'The Challenge',
        content: [
          { paragraphs: ["As a lab assistant in the BYU Prototyping Lab, part of my job was to create demos for high school students and freshmen. I decided to design and fabricate a Tesla turbine and completed it while working part-time over the course of a summer."] },
          { media: [{ type: 'video', src: '/media/turbine-idling.mp4', poster: '/media/turbine-idling.webp', caption: 'Idling Tesla turbine.' }] },
          { paragraphs: [] }, // Add more Challenge paragraphs here.
        ],
      },
      {
        id: 'what-is',
        title: 'What is a Tesla Turbine?',
        content: [
          { paragraphs: ["The Tesla turbine is a little-known invention by Nikola Tesla. Unlike contemporary and modern turbines, this turbine was designed to achieve laminar flow with the agitating fluid. It does so with flat blades oriented parallel to the direction of flow. Although the turbine can't generate much torque, it advertises an incredibly high theoretical efficiency of more than 90%."] },
          { media: [
            { type: 'video', src: '/media/turbine-blade-demo.mp4', poster: '/media/turbine-blade-demo.webp', caption: 'Demonstration of blade interaction with the agitating fluid, provided by a compressed-air gun.' },
          ] },
          { paragraphs: ["I decided to keep my design simple and elegant. I wanted to demonstrate the ability of our multi-axis CNC machines on the frame and see if I could fabricate a clear housing on our resin SLA printers to allow students to see the internal mechanism."] },
        ],
      },
      {
        id: 'manufacturing',
        title: 'Manufacturing',
        content: [
          { paragraphs: ["After a few weeks of designing the turbine in SolidWorks and playing with some proofs of concept, I was ready to start building. I programmed our Haas CNC machines using Mastercam and ran the part on our four-axis mill."] },
          { media: [{type: 'video',
            src: '/media/turbine-machining.mp4',
            poster: '/media/turbine-machining.webp',
            caption: 'Machining the turbine frame on a Haas VF-4 four-axis mill.',
          }]},
          {paragraphs: ["The clear resin housing proved to be a lot more complex. Our lab has Formlabs Form 4 resin printers with clear resin, but we had never achieved transparent prints before. After some research and experimentation, I developed a procedure for creating reliably transparent prints by cleaning each part thouroughly and applying an automotive clear coat."]},
          {media: [{type: 'photo',
            src: '/media/turbine-clear-print-demo.mp4',
            poster: '/media/turbine-clear-print-demo.webp',
            caption: "Samples used to develop the clear resin printing procedure.",
          }]},
          {paragraphs: ["With my fabricated parts and some hardware from McMaster, I was ready to test."]}
        ],
      },
      {
        id: 'testing',
        title: 'Testing',
        content: [
          { paragraphs: ["The turbine was tested by connecting the device to a compressed-air supply and slowly throttling it up while measuring blade speed with a stroboscope."]},
          { media: [
            { type: 'video', src: '/media/turbine-demo.mp4', poster: '/media/turbine-demo.webp', caption: 'Testing the Tesla turbine.' },
          ]},
          { paragraphs: ["The turbine achieved a maximum speed of 45,000 rpm and a tangential blade velocity of 400 mph. The next steps for this project are identifying the source of the sound (which sounds enough like an air-raid siren to scare our neighbors) and hopefully achieving a higher top speed."]}
        ]
      },
      {}
    ],
  },
  {
    id: 'mechatronics',
    title: 'Mechatronics',
    category: 'Robotics & electronics',
    summary: 'A mobile robot that brings a mechanical chassis and custom electronics together.',
    image: '/media/mechatronics-robot.webp',
    imageSize: [1800, 1350],
    imageAlt: 'Assembled wheeled robot with sensors, wiring, and an SF-1 circuit board on the workbench',
    imagePosition: '50% 63%',
    lead: 'Mechanical structure meets custom electronics.',
    overview: 'This build brings a wheeled chassis, sensor mounts, wiring, and a custom circuit board into one mobile platform. The two photographs document the board on its own and the assembled robot on the workbench.',
    topics: ['Mobile robotics', 'Custom PCB', 'System integration'],
    heroCaption: 'The assembled robot, with its board, sensors, and wiring visible.',
    sections: [
      {
        id: 'electronics',
        title: 'A board for the platform',
        content: [
          { paragraphs: ['The custom SF-1 board lays out connections for motor control, sensors, and power. Its shape and connector positions show how the electronics are organized around the needs of the robot.', 'The unpopulated board is a useful view of the design before the wiring and installed components make the connections harder to follow.'] },
          { media: [{ type: 'image', src: '/media/mechatronics-pcb.webp', size: [1800, 1350], alt: 'Unpopulated SF-1 custom circuit board with labeled motor, sensor, and power connections', caption: 'The custom SF-1 circuit board before assembly.' }] },
        ],
      },
      {
        id: 'integration',
        title: 'Putting the system together',
        content: [
          { paragraphs: ['On the assembled platform, the board sits above the chassis between the wheels and sensor mounts. The photograph shows the physical work of integration: routing wires, positioning components, and accommodating the electronics within the mechanical structure.', 'Viewing the board and robot together connects the electrical layout to the hardware it supports.'] },
          { media: [{ type: 'image', src: '/media/mechatronics-robot.webp', size: [1800, 1350], alt: 'Close view of the integrated wheeled robot and its electronics', caption: 'Mechanical and electronic components brought together on the robot.' }] },
        ],
      },
    ],
  },
];

export const projectHref = (project) => `/projects/${project.id}/`;
