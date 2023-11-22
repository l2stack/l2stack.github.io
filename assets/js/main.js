const copyright_text = document.getElementById('copyright-text');
const copyright_year_str = document.getElementById('copyright-year-strong');
const body_page = document.getElementById('body-page');
const profileDiv = document.getElementById('profile');

var client_ip = undefined;
var i = 0;
// const copy_user_id_b = document.getElementById('copy-user-id');

// copy_user_id_b.onclick = function () {
//     $("#dc-cop-succ-modal").modal('show');
// }

// const loading_div = document.getElementById('loading-div');

// document.getElementById("copy-user-id").addEventListener("click", function () {
//     document.getElementById("copy-user-id").focus();
//     if (window.confirm('Copy L2STACK discord id to clipboard?')) {
//         navigator.clipboard.writeText('814402424563040286')
//             .then(() => {
//                 alert('Successfully!');
//             })
//             .catch(err => {
//                 alert('Error: ' + err);
//             });
//     }
// });
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function viewRepo() {
    $("#repositories-modal").modal('show');
}


function write(element, text = '', time = 70) {
    if (!element || time <= 0) {
        return;
    }
    const textToWrite = text || element.textContent;
    element.innerHTML = '_';
    let slot = 0;
    const id = setInterval(() => {
        if (slot >= textToWrite.length) {
            clearInterval(id);
            element.innerHTML = textToWrite;
            return;
        }
        element.innerHTML = textToWrite.substring(0, slot) + '_';
        slot++;
    }, time);
}


async function write_heading() {
    const e_heading = document.getElementById('web-heading');
    var init_text = e_heading.textContent;

    var index = 0;
    while (true) {
        var write_data = ["It's me l2stack", "I'm Freelancer", "I'm web designer", "I AM ATOMIC", 'My favorite language', "Python, Java, Php, C#", 'Your ip: ' + client_ip, 'Date: ' + new Date().toLocaleDateString(), 'Time: ' + new Date().toLocaleTimeString()];
        if (index >= write_data.length)
            index = 0;
        var next = write_data[index].length * 70 + 3000;
        write(e_heading, init_text + write_data[index]);
        index++;
        await sleep(next);
    }

}


window.onload = async function () {
    // await sleep(1000);
    // loading_div.style = 'display: none';
    $.get('https://www.cloudflare.com/cdn-cgi/trace', function (data) {
        data = data.trim().split('\n').reduce(function (obj, pair) {
            pair = pair.split('=');
            return obj[pair[0]] = pair[1], obj;
        }, {});
        client_ip = data['ip'];
    });

    write_heading();
    body_page.style = 'background: rgba(0,0,0,0.8)';
    copyright_year_str.textContent = copyright_year_str.textContent.replace('${YEAR}', new Date().getFullYear());
}