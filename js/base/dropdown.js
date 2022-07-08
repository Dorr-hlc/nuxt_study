layui.define("jquery", function (exports) {
    let $ = layui.jquery;
    function dropdown(options) {
        //{el:id,time:300}
        if (!options) throw new Error("dropdown插件没有传入参数，请传参后使用");
        if (!options.el)
            throw new Error(
                "dropdown插件没有检测到el参数，他是一个jq选择器参数"
            );
        //dropdown容器
        const $dropdown = $(options.el);
        //方向变量
        let direction = "";
        //判断方向
        if ($dropdown.find(".dropdown-top").length) {
            direction = "top";
        } else if ($dropdown.find(".dropdown-bottom").length) {
            direction = "bottom";
        } else if ($dropdown.find(".dropdown-left").length) {
            direction = "left";
        } else if ($dropdown.find(".dropdown-right").length) {
            direction = "right";
        }
        //检测方向是否存在
        if (!direction)
            throw new Error(
                "初始化失败，没有检测到dropdown方向，请检元素class是否正确"
            );
        //初始化
        initDropdownHover({ direction: direction }, $dropdown);

        function initDropdownHover(options, dropdown) {
            //预设配置
            options.time = options.time || 300;

            const $popper = dropdown.find(".layui-dropdown-popper");
            let showData = { opacity: 1 };
            let hideData = { opacity: 0 };
            switch (options.direction) {
                case "top":
                    showData.marginBottom = 5;
                    hideData.marginBottom = 20;
                    break;
                case "bottom":
                    showData.marginTop = 10;
                    hideData.marginTop = 20;
                    break;
                case "left":
                    showData.marginRight = 5;
                    hideData.marginRight = 20;
                    break;
                case "right":
                    showData.marginLeft = 5;
                    hideData.marginLeft = 20;
                    break;
            }

            //添加事件
            dropdown.find(".layui-dropdown-toggle").hover(
                function () {
                    $popper.show().stop(true).animate(showData, options.time);
                },
                function () {
                    $popper
                        .stop(true)
                        .animate(hideData, options.time - 50, function () {
                            //动画结束回调
                            $(this).hide();
                        });
                }
            );
            dropdown.find(".layui-dropdown-popper").hover(
                function () {
                    $popper.show().stop(true).animate(showData, options.time);
                },
                function () {
                    $popper
                        .stop(true)
                        .animate(hideData, options.time - 50, function () {
                            //动画结束回调
                            $(this).hide();
                        });
                }
            );
        }
    } //end

    exports("dropdown", dropdown);
});
