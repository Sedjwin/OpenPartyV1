document.addEventListener('DOMContentLoaded', () => {
    const mediaContainer = document.getElementById('media-container');
    const captionContainer = document.getElementById('caption-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('dots-container');

    let currentIndex = 0;

    const media = [
        {
            type: 'image',
            src: 'media/1.png',
            caption: "In the beginning, representation was a necessity. A single, dedicated Member of Parliament (MP) would travel to the capital. They weren't just a voice; they were a scholar, spending weeks in libraries, studying reports and mastering the complex issues of the day on our behalf. We trusted their expertise because we couldn't access the information ourselves."
        },
        {
            type: 'image',
            src: 'media/2.png',
            caption: "This created a world of two speeds. The MP in Westminster had instant access to the latest reports, debates, and national secrets. Back home in a town like Abingdon, the public had to rely on week-old newspapers and word of mouth. This information gap was the foundation of the old system."
        },
        {
            type: 'image',
            src: 'media/3.png',
            caption: "Today, that gap is gone. At 3:53 PM on a Sunday, a citizen in an Abingdon café can read the exact same live parliamentary report on their phone as the MP in their Westminster office. The information is universal and instantaneous. The primary reason for total delegation has vanished."
        },
        {
            type: 'video',
            src: 'media/4.mp4',
            caption: "Our technology for communication has been upgraded. It's time to upgrade the operating system of our democracy to match. The Collaborative Budget Initiative is that upgrade: a platform to turn our shared information into a shared decision."
        },
        {
            type: 'image',
            src: 'media/5.png',
            caption: "First, we decide the size of our collective wallet. Using simple controls, we can each suggest the ideal rate for every tax. The platform's 'Consequence Engine' instantly aggregates our choices and shows in real-time the total national budget we are generating together."
        },
        {
            type: 'image',
            src: 'media/6.png',
            caption: "Once we know how much we have, we decide where it goes. You allocate your share of the budget across every area of public spending, from the NHS down to a specific local park. It's our money; we draw the map for how it's used."
        },
        {
            type: 'video',
            src: 'media/7.mp4',
            caption: "What happens when people vote only for their own interests? An army Major allocates a huge budget for Defence. A doctor wants everything for the NHS. A teacher prioritises Education. Taken alone, their choices are extreme. But when millions of different priorities are averaged together, the 'wisdom of the crowd' finds a balanced, proportionate result that reflects what the public really wants."
        },
        {
            type: 'image',
            src: 'media/8.png',
            caption: "You have total control over your level of engagement. Be a detailed planner, a passionate advocate, a trusting delegator, or a satisfied observer. Every style of participation is valid, valuable, and contributes to the final result."
        },
        {
            type: 'image',
            src: 'media/9.png',
            caption: "How does this system prevent abuse by delegates or MPs? Their power no longer comes from a hidden vote in parliament, but from their ability to earn your trust publicly. Their entire proposed budget is visible to all their followers. If a special interest group influenced their plan, the change would be instantly visible, leading to a real-time loss of support. They can only lead by proposing plans that people genuinely believe in. Backroom deals become politically toxic when the 'room' is a transparent platform."
        },
        {
            type: 'image',
            src: 'media/10.png',
            caption: "The government's role evolves to expert implementation and oversight. They are the professional administrators tasked with carrying out the public's financial will, and they stand ready to act as the ultimate safeguard for the nation."
        },
        {
            type: 'video',
            src: 'media/11.mp4',
            caption: "If that emergency button is ever pressed, it triggers instant and total transparency. There are no secret meetings or backroom deals. The decision, the justification, and the flow of money are immediately broadcast to all. Corruption thrives in secrecy; this system demands sunlight."
        },
        {
            type: 'image',
            src: 'media/12.png',
            caption: "This isn't a fantasy for the future. With the technology we all hold in our hands in July 2025, we can build a more direct, transparent, and trusted democracy. A budget for the people, by the people, designed for the digital age."
        }
    ];

    if (media.length > 0) {
        setupNavigation();
        showMedia(currentIndex);
    }

    

    function setupNavigation() {
        dotsContainer.innerHTML = '';
        media.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                currentIndex = index;
                showMedia(currentIndex);
            });
            dotsContainer.appendChild(dot);
        });
    }

    function showMedia(index) {
        const currentMedia = media[index];
        mediaContainer.innerHTML = '';

        // Stop any previously playing videos
        const existingVideos = mediaContainer.querySelectorAll('video');
        existingVideos.forEach(v => v.pause());

        if (currentMedia.type === 'image') {
            const img = document.createElement('img');
            img.src = currentMedia.src;
            img.alt = currentMedia.caption; // Add alt text for accessibility
            mediaContainer.appendChild(img);
        } else {
            const video = document.createElement('video');
            video.src = currentMedia.src;
            video.controls = true; // Keep controls for user interaction
            video.autoplay = true; // Autoplay the video
            video.muted = true; // Mute for autoplay to work
            video.playsinline = true; // Improve mobile experience
            video.load(); // Reload the video to ensure it starts from the beginning
            video.play(); // Explicitly play
            mediaContainer.appendChild(video);
        }

        captionContainer.textContent = currentMedia.caption;
        updateDots();
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + media.length) % media.length;
        showMedia(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % media.length;
        showMedia(currentIndex);
    });
});