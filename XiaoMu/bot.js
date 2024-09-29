const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const botAvatar = 'https://tse4-mm.cn.bing.net/th/id/OIP-C.LiKXm86UhtEu_3PrFB31dgHaHa?rs=1&pid=ImgDetMain'; //这个地方是小助手的头像的url，url自己摸索，这都不知道咋搞那就可以重开了

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        appendMessage('user', message);
        chatInput.value = '';
        respondToMessage(message);
    }
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    
    if (sender === 'bot') {
        const avatar = document.createElement('div');
        avatar.classList.add('avatar');
        const img = document.createElement('img');
        img.src = botAvatar;
        img.alt = 'AI';
        avatar.appendChild(img);
        messageElement.appendChild(avatar);
    }
    
    const contentElement = document.createElement('div');
    contentElement.classList.add('message-content');
    contentElement.textContent = message;
    
    if (sender === 'bot') {
        contentElement.addEventListener('click', function() {
            copyToClipboard(message);
            showCopiedFeedback(contentElement);
        });
    }
    
    messageElement.appendChild(contentElement);
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function copyToClipboard(text) {
    console.log('尝试复制文本:', text);

    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);

    console.log('临时文本区域已创建');

    textArea.select();
    textArea.setSelectionRange(0, 99999);

    console.log('文本已选中');

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            console.log('使用 execCommand 复制成功');
        } else {
            console.error('execCommand 复制失败');
            alert('复制失败');
        }
    } catch (err) {
        console.error('复制过程中发生错误:', err);
        alert('复制失败，请手动复制');
    }

    document.body.removeChild(textArea);
    console.log('临时文本区域已移除');
}

function showCopiedFeedback(element) {
    const feedback = document.createElement('div');
    feedback.textContent = '已复制';
    feedback.style.position = 'absolute';
    feedback.style.top = '0';
    feedback.style.right = '0';
    feedback.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    feedback.style.color = 'white';
    feedback.style.padding = '2px 5px';
    feedback.style.borderRadius = '3px';
    feedback.style.fontSize = '12px';
    
    element.style.position = 'relative';
    element.appendChild(feedback);
    
    setTimeout(() => {
        element.removeChild(feedback);
    }, 2000);
}

//这个地方就是个很简单的javascript的if判断，通过判断消息内容里是否存在关键词来决定回复什么话术，你自己要加话术的话就复制我注释的那一段然后往下一行粘贴
//原作者：折木，真的球球了，大家二改请不要删除这段话，谢谢大家了，我之前写的假打款就被二改大肘子“坏蛋”二改成他的了，圈子里的人都一度认为是坏蛋写的，真的很难受
//有什么想写的可以联系QQ：2405637643，演示完后付款，欢迎大家前来支持
//此源代码基于“MIT协议”开源（协议文件我就不搞了，反正都会被删），欢迎大家前来修改，欢迎大家前来提意见g ithub开源地址：https://github.com/zhemu-code/chatbot

function respondToMessage(message) {
    let response = '';
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('鱼') && (lowerMessage.includes('来') || lowerMessage.includes('进'))) {
        response = '开始话术xxx';
    } else if (lowerMessage.includes('验证码') || lowerMessage.includes('换绑') || lowerMessage.includes('哈喽')) {
        response = '换绑话术xxx';
    } else if (lowerMessage.includes('不信') || lowerMessage.includes('不相信')) {
        response = '不信话术xxx';
    } else if (lowerMessage.includes('祝福语') || lowerMessage.includes('祝福语')) {
        response = '折木master天天开心作者QQ：2405637643';
    } else if (lowerMessage.includes('1') || lowerMessage.includes('你好') || lowerMessage.includes('什么东西')) {
        response = '你好，我是小木鲨鱼助手，我会告诉你鲨鱼的一些信息,点击我的消息就能直接复制发给鱼了哦！ 作者QQ：2405637643';
    } else if (lowerMessage.includes('图床') || lowerMessage.includes('图片转链接') || lowerMessage.includes('图片变成链接')) {
        response = '1.打开网页https://xx.xx/ 2.点击上传图片 3.复制图片链接';
    
    // } else if (lowerMessage.includes('图床') || lowerMessage.includes('图片转链接') || lowerMessage.includes('图片变成链接')) {
    //     response = '1.打开网页https://xx.xx/ 2.点击上传图片 3.复制图片链接';
    //就是这一行，把注释符删掉就能添加话术了，||是多个关键词检索，你也可以仔细看看代码，就会理解用意了

    } else {
        response = '抱歉，你的问题暂时未收录，联系折木收录作者QQ：2405637643';
    }
    setTimeout(() => appendMessage('bot', response), 500);
}

chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function preventZoom(e) {
    var t2 = e.timeStamp;
    var t1 = e.currentTarget.dataset.lastTouch || t2;
    var dt = t2 - t1;
    var fingers = e.touches.length;
    e.currentTarget.dataset.lastTouch = t2;

    if (!dt || dt > 500 || fingers > 1) return;
    e.preventDefault();
    e.target.click();
}

document.addEventListener('DOMContentLoaded', function() {
    chatInput.addEventListener('touchend', preventZoom, false);
});