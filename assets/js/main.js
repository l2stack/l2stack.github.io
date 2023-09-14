write(element=document.getElementById('heading'))
write(element=document.getElementById('noice'), undefined, time=10)
write(element=document.getElementById('noice-1'), undefined, time=50)


/**
 * Write/Re-write text content
 * @param {HTMLElement} element Element to write
 * @param {String} text Text to write (blank -> re-write content)
 * @param {Int16Array} time Default is 50 (Time to write next char)
 */
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