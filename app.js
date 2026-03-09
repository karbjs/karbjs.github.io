// Cập nhật năm
document.getElementById("year").innerHTML = new Date().getFullYear();

// Xử lý hiệu ứng cuộn cho Header
window.addEventListener('scroll', function() {
    const headerInner = document.getElementById('header-inner');
    const innerBox = headerInner.querySelector('div');
    const avatar = document.getElementById('avatar');
    const brandName = document.getElementById('brand-name');
    const brandSub = document.getElementById('brand-sub');

    if (window.scrollY > 50) {
        // Khi cuộn xuống: Phóng full chiều rộng, bỏ bo góc, bỏ margin top
        headerInner.classList.remove('container', 'mt-4', 'px-4', 'sm:px-6', 'lg:px-10');
        headerInner.classList.add('w-full');
        innerBox.classList.remove('rounded-3xl', 'p-6');
        innerBox.classList.add('rounded-none', 'px-10', 'py-3');
        
        // Thu nhỏ các thành phần
        avatar.classList.replace('w-24', 'w-12');
        avatar.classList.replace('h-24', 'h-12');
        brandName.classList.replace('text-2xl', 'text-xl');
        brandSub.classList.add('hidden'); // Ẩn bớt mô tả cho gọn
    } else {
        // Khi ở trên cùng: Trở lại trạng thái ban đầu
        headerInner.classList.add('container', 'mt-4', 'px-4', 'sm:px-6', 'lg:px-10');
        headerInner.classList.remove('w-full');
        innerBox.classList.add('rounded-3xl', 'p-6');
        innerBox.classList.remove('rounded-none', 'px-10', 'py-3');

        avatar.classList.replace('w-12', 'w-24');
        avatar.classList.replace('h-12', 'h-24');
        brandName.classList.replace('text-xl', 'text-2xl');
        brandSub.classList.remove('hidden');
    }
});

function renderList(lang) {
    document.documentElement.setAttribute('lang', lang);
    fetch('lang.json')
        .then(res => res.json())
        .then(data => {
            document.querySelectorAll('[data-key]').forEach(el => {
                const key = el.getAttribute('data-key');
                if(key != "skill1_list" && key != "skill2_list" && key != "skill3_list" && key != "exp1_list" && key != "exp2_list" && key != "exp3_list"){
                    el.innerHTML = data[lang][key];
                }else{
                    el.innerHTML = "";
                    data[lang][key].forEach(item => {
                        let li = document.createElement('li');
                        li.innerHTML = item; 
                        el.appendChild(li);
                    });
                }
                
                
            });
            localStorage.setItem('preferredLang', lang);
        });
}

currentLang = localStorage.getItem('preferredLang') || "en";
renderList(currentLang)