// 表单提交交互逻辑
document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const feedback = document.getElementById('feedback').value;
    document.getElementById('response').textContent = `Thanks for your feedback: "${feedback}"!`;
});

// 滚动淡入效果
window.addEventListener('scroll', function() {
    let elements = document.querySelectorAll('.fade-in');
    elements.forEach(function(element) {
        let position = element.getBoundingClientRect().top;
        let screenPosition = window.innerHeight / 1.5;
        if (position < screenPosition) {
            element.classList.add('active');
        }
    });
});

// 音乐播放和暂停控制
const music = document.getElementById('backgroundMusic');
const musicControl = document.getElementById('musicControl');

musicControl.addEventListener('click', function() {
    if (music.paused) {
        music.play();
        musicControl.textContent = 'Pause Music';
    } else {
        music.pause();
        musicControl.textContent = 'Play Music';
    }
});
// 歌词数据（LRC格式）
const lyricsText = `
[00:36.98] 伍岚正和程艾影
[00:46.07] 从上海到武汉
[00:49.82] 他们要坐十天马车
[00:53.87] 三天两夜的轮船
[01:01.42] 泥路上艾影含着糖
[01:04.94] 靠着岚正的肩膀
[01:08.80] 马车经过村庄
[01:12.00] 石路颠簸不渝的情肠
[01:17.15] 一路望 跌跌撞
[01:21.49] 午夜流星何去何往
[01:25.66] 路海长 青夜旷
[01:29.89] 越过群山追斜阳
[01:51.96] 拨开面纱回望故乡
[01:55.59] 只见潮湿的月亮
[01:59.34] 雨水冲不掉
[02:02.14] 常德路上爬满蛛网的门窗
[02:08.70] 梦里回到他的身旁
[02:12.47] 蜜语中风不再凉
[02:16.16] 永远都像初次见你那样
[02:21.27] 使我心荡漾
[02:24.62] 没有奇迹 没有惊喜
[02:28.79] 尘埃里花不会哭泣
[02:33.04] 没有质疑 没有道理
[02:37.16] 褶皱的信乘飞雨
[02:58.24] 一路望 跌跌撞
[03:03.02] 午夜流星何去何往
[03:06.67] 路海长 青夜旷
[03:10.76] 越过群山追斜阳
[03:14.89] 没有奇迹 没有惊喜
[03:19.27] 尘埃里花不会哭泣
[03:23.03] 没有质疑 没有道理
[03:27.73] 褶皱的信乘飞雨
[04:12.80] 漫山遍野你的脸庞
[04:16.86] 唯有遗忘是最漫长
[04:20.76] 这是一条必经的路
[04:24.80] 没有指引出口的光
`;

// 解析歌词并返回带时间戳和歌词内容的数组
function parseLyrics(lyrics) {
    const lines = lyrics.split("\n");
    const lyricsArray = [];

    lines.forEach(line => {
        const timeReg = /\[(\d{2}):(\d{2})\.(\d{2})\]/;
        const result = timeReg.exec(line);
        if (result) {
            const minutes = parseInt(result[1], 10);
            const seconds = parseInt(result[2], 10);
            const milliseconds = parseInt(result[3], 10);
            const time = minutes * 60 + seconds + milliseconds / 100;
            const text = line.replace(timeReg, '').trim();
            lyricsArray.push({ time, text });
        }
    });

    return lyricsArray;
}

// 更新显示歌词
function updateLyrics(currentTime) {
    const lyricsElement = document.getElementById('lyrics');
    const currentLyrics = lyricsArray.filter(lyric => lyric.time <= currentTime).pop();
    
    if (currentLyrics) {
        lyricsElement.innerHTML = `<p>${currentLyrics.text}</p>`;
    }
}

// 解析歌词文本
const lyricsArray = parseLyrics(lyricsText);

// 获取音频元素
const audioElement = document.querySelector('audio');

// 在音频播放时更新歌词
audioElement.addEventListener('timeupdate', () => {
    const currentTime = audioElement.currentTime;
    updateLyrics(currentTime);
});
