document.getElementById('btn').addEventListener('click', () => {
    event.preventDefault();
    document.getElementsByClassName('logo')[0].style.filter = "blur(4px)"
    document.getElementById('main_1').style.filter = "blur(4px)"
    document.getElementById('mainloading').style.display = "block";
    let form_fields = document.getElementById('gamma').querySelectorAll('.input-group');
    // console.log( document.getElementById('gamma').querySelector('.input-group > .input-group__label').htmlFor)
    let data = {};
    form_fields.forEach((field) => {
        if (field.querySelector('.input-group__input').value != '') {
            var a = field.querySelector('.input-group__label').htmlFor;
            a = a.toLocaleLowerCase();
            data[a] = field.querySelector('.input-group__input').value;
        }
    });
    let questions;
    let query = $.param(data);
    fetch(`http://api.stackexchange.com/2.2/questions?site=stackoverflow&${query}`, {
        mode: 'cors'
    })
        //add loader when when fetch starts and remove when it ends in val then
        //add error handling
        //i should have used rxjs here
        //pagination.js would be better in this case
        .then((res) => res.json())
        .then((val) => {
            //could have reset thr form here
            console.log(val)
            document.getElementById('main_1').style.display = "none";
            document.getElementById('main_2').style.display = "block";
            document.getElementsByClassName('logo')[0].style.filter = "blur(0)"
            document.getElementById('mainloading').style.display = "none";
            return val.items.map(item => item.title)
        }).then(result => {
            document.getElementById('pagination').innerHTML = "";
            document.getElementById('questions').innerHTML = "";
            //i miss exbhbs and Angular
            result.forEach((item, index) => {
                if (index < 8) {
                    var p = document.createElement("P");
                    p.innerHTML = `<span>Q-${index + 1}.  </span>${item}`;
                    document.getElementById("questions").appendChild(p);
                    var hr = document.createElement("hr");
                    document.getElementById("questions").appendChild(hr);
                }
            })
            let pages = Math.ceil(result.length / 8);
            for (var i = 0; i < pages; i++) {
                var a = document.createElement('a');
                a.innerHTML = i + 1;
                document.getElementById('pagination').appendChild(a);
                document.querySelector('.pagination>a').classList.add('active')
            }
            document.querySelectorAll('.pagination>a').forEach(item => {
                item.addEventListener("click", () => {
                    document.getElementById('questions').innerHTML = "";
                    var current = document.getElementsByClassName("active");
                    current[0].classList.replace("active","ui");
                    item.classList.add('active')
                    let set = item.innerHTML - 1;
                    result.forEach((item, index) => {
                        if (index >= set * 8 && index < (set + 1) * 8) {
                            var p = document.createElement("P");
                            p.innerHTML = `<span>Q-${index + 1}.  </span>${item}`;
                            document.getElementById("questions").appendChild(p);
                            var hr = document.createElement("hr");
                            document.getElementById("questions").appendChild(hr);
                        }
                    })
                })
            })
        })
})
document.getElementsByClassName('icon_back')[0].addEventListener('click',()=>{
    console.log('baga')
    document.getElementById('main_1').style.display = "block";
    document.getElementById('main_1').style.filter = "blur(0)"
    document.getElementById('main_2').style.display = "none";
    document.getElementById('mainloading').style.display = "none";
})