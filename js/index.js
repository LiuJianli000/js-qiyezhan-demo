$(document).ready(function () {
    // banner 轮播
    axios.get('http://mock-api.com/mgvrkAgQ.mock/banner-img')
        .then(function (res) {
            res.data.forEach(function (item) {
                $('#banner-img').append(`<li><img src="${item.src}" /></li>`)
            });


            function Carousel($ct) {
                this.init($ct)
                this.bind()
                this.autoPlay()
            }
            Carousel.prototype = {
                init: function ($ct) {
                    this.$ct = $ct
                    this.$bannerImg = this.$ct.find('#banner-img')
                    this.$imgs = this.$ct.find('#banner-img > li')
                    this.$preBtn = this.$ct.find('.pre')
                    this.$nextBtn = this.$ct.find('.next')
                    this.$bullets = this.$ct.find('.bullets li')

                    this.imgCount = this.$imgs.length
                    this.imgWidth = this.$imgs.width()
                    this.index = 0
                    this.isAnimate = false

                    this.$bannerImg.append(this.$imgs.first().clone())
                    this.$bannerImg.prepend(this.$imgs.last().clone())

                    this.$bannerImg.width((this.imgCount + 2) * this.imgWidth)
                    this.$bannerImg.css('left', - this.imgWidth)

                },
                bind: function () {
                    var _this = this
                    this.$nextBtn.on('click', function () {
                        // console.log('next...')
                        _this.playNext(1)
                    })
                    this.$preBtn.on('click', function () {
                        // console.log('pre...')
                        _this.playPre(1)
                    })
                    this.$bullets.on('click', function () {
                        // console.log('index: ' + $(this).index())
                        var index = $(this).index()
                        if (_this.index > index) {
                            _this.playPre(_this.index - index)
                        } else {
                            _this.playNext(index - _this.index)
                        }
                    })
                },
                playNext: function (len) {
                    var _this = this
                    if (this.isAnimate) return
                    this.isAnimate = true
                    this.$bannerImg.animate({
                        left: '-=' + this.imgWidth * len
                    }, function () {
                        _this.index += len
                        if (_this.index === _this.imgCount) {
                            _this.$bannerImg.css('left', -_this.imgWidth)
                            _this.index = 0
                        }
                        // console.log('_this.index: ' + _this.index)
                        _this.setBullet()
                        _this.isAnimate = false
                    })

                },
                playPre: function (len) {
                    var _this = this
                    if (_this.isAnimate) return
                    _this.isAnimate = true
                    this.$bannerImg.animate({
                        left: '+=' + this.imgWidth * len
                    }, function () {
                        _this.index -= len
                        if (_this.index < 0) {
                            _this.$bannerImg.css('left', -_this.imgWidth * _this.imgCount)
                            _this.index = _this.imgCount - 1
                        }
                        // console.log('_this.index: ' + _this.index)
                        _this.setBullet()
                        _this.isAnimate = false
                    })
                },

                setBullet: function () {
                    this.$bullets.eq(this.index).addClass('active')
                        .siblings().removeClass('active')
                },
                autoPlay: function () {
                    var _this = this
                    this.autoClock = setInterval(function () {
                        _this.playNext(1)
                    }, 3000)
                },
                stopAuto: function () {
                    clearInterval(this.autoClock)
                }


            }

            new Carousel($('#banner'))

        })

        // 获取团队信息
        axios.get('http://mock-api.com/mgvrkAgQ.mock/team-info')
            .then(function(res) {
                // console.log(res)
                res.data.team.forEach(function(item){
                    // console.log(item.img)
                    $('#team > ul').append(`
                        <li>
                            <div class="contentImg"><img src="${item.img}" alt=""></div>
                            <div class="contentBox">
                                <h2>${item.title}</h2>
                                <p class="text">${item.text}</p>
                                <hr />
                                <p class="attr">能 &nbsp 力: ${item.attr}</p>
                            </div>
                        </li>
                    `)
                })
            })

        // 获取新闻信息
        axios.get('http://mock-api.com/mgvrkAgQ.mock/news')
            .then(function(res) {
                // console.log(res)
                res.data.news.forEach(function(item) {
                    $('#news > ul').append(`
                        <li>
                            <a href="./news.html"><img src="${item.img}" alt=""></a>
                            <p class="newsTitle">${item.title}</p>
                            <hr>
                            <p class="newsText">${item.text}</p>
                        </li> 
                    `)
                })
            })

        // footer
        axios.get('http://mock-api.com/mgvrkAgQ.mock/about')
            .then(function(res) {
                console.log(res)
                res.data.about.forEach(function(item) {
                    $('footer > ul').append(`
                        <li>
                            <a href="./about.html"><span class="iconfont ${item.icon}"></span></a><br>
                            <span>${item.text}</span>
                        </li> 
                    `)
                })
                $('footer > ul').append(`
                    <li>
                    <a href="./about.html"><span><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1838781477,1688363439&fm=115&gp=0.jpg" alt="" /></span></a><br/>
                        <span>扫一扫 加入复仇者联盟</span>
                    </li> 
                `)
            })
        
})