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
        '11 (1).jpg',
        '11 (2).jpg',
        '11 (3).jpg',
        '11 (4).jpg',
        '11 (5).jpg',
        '11 (6).jpg',
        '11 (7).jpg',
        '11 (8).jpg',
        '11 (9).jpg',
        '11 (10).jpg',
        '11 (11).jpg',
        '11 (12).jpg',
        '11 (13).jpg',
        '11 (14).jpg'
    ];

    // 随机打乱图片数组
    const shuffledImages = imageFiles.sort(() => Math.random() - 0.5);

    // 更新gallery中的图片
    const panelImages = document.querySelectorAll('.panel-image');
    panelImages.forEach((img, index) => {
        if (shuffledImages[index]) {
            img.src = `images/${shuffledImages[index]}`;
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
                    img.src = `images/${shuffled[index]}`;
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
            
            // 定义可能的回复
            const replies = [
                "今天天气真不错呢！",
                "要不要一起去散步？",
                "你知道吗？我最喜欢晒太阳了！",
                "我们来聊聊天吧！",
                "你今天看起来心情不错呢！"
            ];
            
            // 根据用户输入选择回复
            let reply = "喵~ ";
            if (message.includes('你好') || message.includes('hi') || message.includes('hello')) {
                reply += "你好呀！我是王一一，很高兴见到你！";
            } else {
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