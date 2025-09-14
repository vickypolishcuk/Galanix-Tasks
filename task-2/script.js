function getFormattedDate() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function getNumberOfImg() {
    return (document.querySelectorAll('img')).length;
}

document.querySelector('.data').textContent = `Date: ${getFormattedDate()}`;
document.querySelector('.number').textContent = `Number of images: ${getNumberOfImg()}`;