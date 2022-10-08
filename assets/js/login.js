$(function(){
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').on('click',function(){
        $('.reg-box').hide();
        $('.login-box').show();
    });
    // 表单验证
    var form=layui.form;
    var layer=layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            var val=$('.reg-box [name=password]').val();
            if(val!==value){
                return '两次密码不一致';
            }
        }
        
    })

    // 监听表单提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault();
        var data={username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()};
        $.post('/api/reguser',data,function(res){
        if(res.status!==0){
            return layer.msg(res.message);
        }
        layer.msg('注册成功,请登录！');
        // 手动调用登录界面
        $('#link_login').click();
        })

    })

    // 监听表单登录事件
    $('#form_login').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                console.log(res.token);
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                  }
                layer.msg('登录成功！')

                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href='/index.html'
            }
          })
    })

    

    


})