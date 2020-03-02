window.onload = function () {

    //tab切换功能
    let oP = document.querySelectorAll('.right-header > p');
    let icon = document.querySelectorAll('.icon');

    for (let i = 0; i < oP.length; i++) {

        oP[i].onclick = function () {

            for (let j = 0; j < oP.length; j++) {
                oP[j].classList.remove('co');
            }
            this.classList.add('co');

            for (let k = 0; k < icon.length; k++) {
                icon[k].style.display = 'none';
            }
            icon[i].style.display = 'block';
        }
    }



    //登录功能
    let uname = document.querySelector('.username');
    let upass = document.querySelector('.password');
    let btn1 = document.querySelector('.btn1');

    btn1.onclick = function () {

        axios.get(loginApi, {
            params: {
                username: uname.value,
                password: upass.value
            }
        }).then(res => {
            console.log(res);
            if (res.data.code == 1) {
                console.log(res.data.code);
                Cookies.set('id', res.data.data.id, { expires: 365 })
                Cookies.set('username', res.data.data.username, { expires: 365 })

                console.log(Cookies.get('id'));

                //验证
                let ip = false;
                let ipone = /^(1[3-8])\d{9}$/.test(uname.value);
                if (ipone) {
                    ip = true;
                } else {
                    ip = false;
                }

                let ps = false;
                let pass = /\w/.test(upass.value);
                if (pass) {
                    ps = true;
                } else {
                    ps = false;
                }
                /* if (ip && ps) {
                    alert('登录成功')
                    location.href = './index.html';
                } */
            }
        })
    }


    //注册功能
    let tel = document.querySelector('.tel');
    let text = document.querySelector('.text');
    let btn2 = document.querySelector('.btn2');

    btn2.onclick = function () {

        axios.get(regApi, {
            params: {
                username: tel.value,
                password: text.value
            }
        }).then(res => {
            
            //验证
            let ip = false;
            let ipone = /^(1[3-8])\d{9}$/.test(tel.value);
            if (ipone) {
                ip = true;
            } else {
                ip = false;
            }

            let ps = false;
            let pass = /\w/.test(text.value);
            if (pass) {
                ps = true;
            } else {
                ps = false;
            }
            if (ip && ps && res.data.code == 1) {
                alert('注册成功！');
                location.href = './login.html';
            }else{
                alert('账号或密码格式不正确！');
            }

            /* if (res.data.code == 1) {
                alert('注册成功！');
                location.href = './login.html';
            } */
        })
    }
}

