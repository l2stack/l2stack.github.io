const copyright_text = document.getElementById('copyright-text');
const copyright_year_str = document.getElementById('copyright-year-strong');
const body_page = document.getElementById('body-page');
// const loading_div = document.getElementById('loading-div');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = async function () {
    // await sleep(1000);
    loading_div.style = 'display: none';
    body_page.style = 'background: rgba(0,0,0,0.8)';
    copyright_year_str.textContent = copyright_year_str.textContent.replace('${YEAR}', new Date().getFullYear());
}