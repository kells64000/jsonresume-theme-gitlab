const onSelectPillClose = () => {
    document.querySelectorAll('button[data-bs-toggle="pill"]').forEach(el =>
        el.addEventListener('shown.bs.tab', () => {
            close()
        })
    )
}

export const close = () => {
    const sidenav = document.querySelector('.sidenav')
    sidenav.classList.add('d-none')
}

export const collapse = () => {
    const sidenav = document.querySelector('.sidenav')
    sidenav.classList.toggle('d-none')

    onSelectPillClose()
}

export const toggle = () => {
    const sidenav = document.querySelector('.sidenav')
    sidenav.classList.toggle('toggled')

    const sidenavSpans = Array.from(sidenav.querySelectorAll('span'))
    sidenavSpans.map(span => span.classList.toggle('d-none'))

    const sidenavTogglerIcon = sidenav.querySelector('.sidenav-toggler i')
    sidenavTogglerIcon.classList.contains('fa-angles-left')
        ? sidenavTogglerIcon.classList.replace('fa-angles-left', 'fa-angles-right')
        : sidenavTogglerIcon.classList.replace('fa-angles-right', 'fa-angles-left')
}
