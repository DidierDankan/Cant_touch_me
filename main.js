const evilBtn = document.getElementById('evilBtn');
const OFFSET = 100;

evilBtn.addEventListener('click', () => {
    alert('Nice Try')
    window.close();
})

document.addEventListener('mousemove', (e) => {
    const x = e.pageX;
    const y = e.pageY;
    const btnBox = evilBtn.getBoundingClientRect()
    console.log(btnBox.x, btnBox.y)

    const horizontalDistance = distanceFromCenter(btnBox.x, x, btnBox.width);
    const verticalDistance = distanceFromCenter(btnBox.y, y, btnBox.height);

    const horizontalOffset = btnBox.width / 2 + OFFSET;
    const verticalOffset = btnBox.width / 2 + OFFSET;

    if(Math.abs(horizontalDistance) <= horizontalOffset && Math.abs(verticalDistance) <= verticalOffset) {
        setBtnPosition(
            btnBox.x + horizontalOffset / horizontalDistance * 10,
            btnBox.y + verticalOffset / verticalDistance * 10
        )
    }
});

function setBtnPosition(left, top) {
    const windowBox = document.body.getBoundingClientRect();
    const btnBox = evilBtn.getBoundingClientRect()

    if(distanceFromCenter(left, windowBox.left, btnBox.width) < 0) {
        left = windowBox.right - btnBox.width - OFFSET;
    }

    if(distanceFromCenter(left, windowBox.right, btnBox.width) > 0) {
        left = windowBox.left + OFFSET;
    }

    if(distanceFromCenter(top, windowBox.top, btnBox.height) < 0) {
        top = windowBox.bottom - btnBox.height - OFFSET;
    }

    if(distanceFromCenter(top, windowBox.bottom, btnBox.height) > 0) {
        top = windowBox.top + OFFSET;
    }

    evilBtn.style.left = `${left}px`
    evilBtn.style.top = `${top}px`
}

function distanceFromCenter( boxPosition, mousePosition, boxSize) {
    return boxPosition - mousePosition + boxSize / 2;
}
