// 音乐播放器控制
document.addEventListener('DOMContentLoaded', function() {
    const audioElement = document.getElementById('bgMusic');
    const musicButton = document.querySelector('.background-music-button');
    const musicIcon = musicButton.querySelector('.icon');
    let isPlaying = true;  // 默认为播放状态

    // 设置音频源和初始设置
    audioElement.src = './music/chuxianyoulikai.mp3';
    audioElement.volume = 0.5;
    audioElement.load();

    // 自动播放处理
    const startAutoplay = async () => {
        try {
            await audioElement.play();
            updateIcon();
        } catch (error) {
            console.error('自动播放失败:', error);
            // 如果自动播放失败，提示用户点击播放
            isPlaying = false;
            updateIcon();
            alert('请点击播放按钮来启动音乐');
        }
    };

    // 页面加载完成后尝试自动播放
    startAutoplay();
    
    // 更新播放图标
    function updateIcon() {
        musicIcon.textContent = isPlaying ? '⏸️' : '🎵';
        musicButton.querySelector('span:not(.icon)').textContent = 
            isPlaying ? 'Playing...' : 'Play Music';
        musicButton.setAttribute('data-playing', isPlaying);
    }

    // 播放/暂停切换
    async function togglePlay() {
        try {
            if (isPlaying) {
                await audioElement.pause();
            } else {
                await audioElement.play();
            }
            isPlaying = !isPlaying;
            updateIcon();
            
            // 添加动画效果
            musicButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                musicButton.style.transform = 'scale(1)';
            }, 200);
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    }

    // 点击事件监听
    musicButton.addEventListener('click', togglePlay);

    // 音频加载错误处理
    audioElement.addEventListener('error', function(e) {
        console.error('Audio loading error:', e);
        alert('音频文件加载失败，请检查文件路径是否正确');
        musicButton.style.opacity = '0.5';
        musicButton.style.cursor = 'not-allowed';
    });

    // 当音频结束时重新播放
    audioElement.addEventListener('ended', function() {
        audioElement.currentTime = 0;
        audioElement.play();
    });
});

// 获取imgs文件夹中的图片
async function loadImages() {
    const imageFiles = [
        '20241129164349.jpg',
        '20241129164405.jpg',
        '20241129164416.jpg',
        '20241129164424.jpg',
        '20241129164431.jpg',
        '20241129164441.jpg',
        '20241129164448.jpg',
        '20241129164449.jpg',
        '20241129164454.jpg'
    ];

    // 随机打乱图片数组
    const shuffledImages = imageFiles.sort(() => Math.random() - 0.5);

    // 更新gallery中的图片
    const panelImages = document.querySelectorAll('.panel-image');
    panelImages.forEach((img, index) => {
        if (shuffledImages[index]) {
            img.src = `imgs/${shuffledImages[index]}`;
        }
    });

    // 设置定时器，每隔一段时间更新图片
    setInterval(() => {
        const shuffled = imageFiles.sort(() => Math.random() - 0.5);
        panelImages.forEach((img, index) => {
            if (shuffled[index]) {
                // 使用淡入淡出效果
                img.style.opacity = '0';
                setTimeout(() => {
                    img.src = `imgs/${shuffled[index]}`;
                    img.style.opacity = '1';
                }, 500);
            }
        });
    }, 5000); // 每5秒更新一次图片
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadImages); 

// 添加聊天功能
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    const message = messageInput.value.trim();

    if (message) {
        // 创建用户消息元素
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.textContent = message;
        chatMessages.appendChild(userMessage);

        // 清空输入框
        messageInput.value = '';

        // 模拟自动回复
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            
            // 根据用户输入选择回复
            let reply = "喵~ ";
            if (message.includes('你好') || message.includes('hi') || message.includes('hello')) {
                reply += "你好呀！我是Reo和Ao，很高兴见到你！";
            } else if (message.includes('名字')) {
                reply += "我们是Reo和Ao，是两只可爱的猫咪~";
            } else if (message.includes('喜欢') || message.includes('爱')) {
                reply += "我也很喜欢你呢！要一起玩吗？";
            } else {
                const replies = [
                    "喵喵喵~",
                    "要一起玩吗？",
                    "摸摸头~",
                    "想吃小鱼干...",
                    "让我想想怎么回答...",
                    "你说得对！",
                    "好有趣啊！"
                ];
                reply += replies[Math.floor(Math.random() * replies.length)];
            }
            
            botMessage.textContent = reply;
            chatMessages.appendChild(botMessage);
            
            // 滚动到最新消息
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
}

// 添加回车发送功能
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}); 