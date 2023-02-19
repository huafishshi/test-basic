window.addEventListener('load', function() {
    // 1. 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.home .right');
    var img = this.document.querySelector(".home .right img");
    // 图片的宽度
    var imgWidth = img.offsetWidth;
    // console.log(focusWidth);
     // 2. 鼠标经过focus 就显示隐藏左右按钮
     focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
    });
    // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
    var ul = focus.querySelector('.right ul');
    var ol = focus.querySelector('.circle');
   
    // 一共有四张照片
    // console.log(ul.children.length);
    // console.log(ul);
    for(var i = 0 ; i < ul.children.length; i++) {
        // 创建一个 li
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做 
        li.setAttribute('index',i);
        // 把 li 插入到 ol 里面
        ol.appendChild(li);

        // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click',function(){
             // 干掉所有人 把所有的小li 清除 current 类名
            for(var i = 0 ;i<ol.children.length;i++){
                ol.children[i].className ='';
            } 
            // 留下我自己  当前的小li 设置current 类名
            this.className = 'current';
           
            // 5. 点击小圆圈，移动图片 当然移动的是 ul
            var index = this.getAttribute('index');
            // console.log(index);
            // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            num = index;
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle 
            circle = index;
            animate(ul, -index * imgWidth,function(){
               
            });
        
        })
    }
        // 把ol里面的第一个小li设置类名为 current
        ol.children[0].className = 'current';
        var num = 0;
        var circle = 0;
        // 6。克隆第一幅图作为最后一幅图
        var first = ul.children[0].cloneNode(true);
        ul.appendChild(first);
        // 
        var flag = true;

        arrow_r.addEventListener('click', function() {
            // if(flag){
                // flag = false;
                // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
                if(num == ul.children.length-1 ){
                    ul.style.left = 0;
                    num = 0;
                }
                num++;

                animate(ul, -num * imgWidth,function(){
                    flag = true;
                });
                // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
                circle++;
                // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
                if(circle == ol.children.length){
                    circle = 0;
                }
                circleChange();
            // }
        })

        arrow_l.addEventListener('click', function() {
            if(flag){
                flag = false;
                // 如果走到了第一张图片，此时 我们的ul 要快速复原 left 改为 0
                if(num == 0 ){
                    ul.style.left = ul.children.length-1 * imgWidth+ 'px';
                    num = ul.children.length-1;
                }
                num--;

                animate(ul, -num * imgWidth,function(){
                    flag = true;
                });
                // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
                // console.log(circle);
                circle--;
                // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
                if(circle < 0){
                    circle = ol.children.length-1;
                }
                circleChange();
            }
        })
    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }

    // 添加时间函数
    var timer = setInterval(function(){
        arrow_r.click();
    },2000)

    // 获得ul
    var ulLeft = this.document.querySelector(".left ul");
    var intro = this.document.querySelector(".intro")
    for(var j=0;j<ulLeft.children.length;j++){
        change(j)
    }

    function change(i){
        ulLeft.children[i].addEventListener("mouseenter",function(){
            intro.style.display = 'block';
        })
        ulLeft.children[i].addEventListener("mouseout",function(){
            intro.style.display = '';
        })
    }
})