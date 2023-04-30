'use strict'

/**
 * Hide modal
 * @param {'element'} modal 
 * @param {'document body element'} body 
 * @param {'element'} heap 
 * @param {'element'} overlay 
 */
function writingorHideModal(
    modal = false,
    body = document.querySelector('body'),
    heap = document.querySelector('#writingor--modals-heap'),
    overlay = document.querySelector('#writingor--body-overlay')
    ) {

    if (body && heap && overlay && modal) {
        modal.classList.remove('writingor--modal_active')
        overlay.classList.remove('writingor--body-overlay_active')
        body.classList.remove('writingor--body_locked')
        heap.append(modal)

    } else {
        console.warn('Check elements:', modal, body, heap, overlay)
    }
}

/**
 * Show modal
 * @param {'element'} button
 * @param {'document body element'} body 
 * @param {'element'} heap 
 * @param {'element'} overlay 
 */
function writingorShowModal(
    button = false,
    body = document.querySelector('body'),
    heap = document.querySelector('#writingor--modals-heap'),
    overlay = document.querySelector('#writingor--body-overlay')
    ) {

    if (button && body && heap && overlay) {
        
        let allExistingModals = overlay.querySelectorAll('.writingor--modal')

        if (allExistingModals) {
            allExistingModals.forEach(existingModal => {
                writingorHideModal(existingModal)
            })
        }

        let target = button.getAttribute('data-modal') ? button.getAttribute('data-modal') : button.getAttribute('href')

        if (target && target.startsWith('#')) {
            let modal = document.querySelector(target)

            if (modal) {
                overlay.append(modal)
                overlay.classList.add('writingor--body-overlay_active')
                body.classList.add('writingor--body_locked')
                modal.classList.add('writingor--modal_active')

                let hideButton = modal.querySelector('.writingor--modal__hide')

                if (!hideButton) {
                    hideButton = document.createElement('div')
                    hideButton.setAttribute('class', 'writingor--modal__hide')
                    modal.append(hideButton)
                }

                if (hideButton && !hideButton.classList.contains('writingor--modal__hide_ready')) {
                    hideButton.classList.add('writingor--modal__hide_ready')
                    hideButton.addEventListener('click', function () {
                        writingorHideModal(modal)
                    })
                }
            } else {
                console.error(`Modal with id ${target} is undefined`)
            }

        } else {
            console.warn('Element with "data-modal" must start with "#" in "data-modal" or "href" attribute')
        }
        
    } else {
        console.warn('Check elements:', button, body, heap, overlay)
    }
}

/**
 * Сall
 * writingorShowModal()
 * and
 * writingorHideModal()
 * on page load
 */
{
    document.addEventListener('DOMContentLoaded', function () {

        const body = document.querySelector('body')
    
        const overlay = document.createElement('div')
        overlay.setAttribute('id', 'writingor--body-overlay')
        overlay.setAttribute('class', 'writingor--body-overlay')
        body.append(overlay)
        
        const heap = document.createElement('div')
        heap.setAttribute('id', 'writingor--modals-heap')
        heap.setAttribute('class', 'writingor--modals-heap')
        body.append(heap)
    
        const openButtons = document.querySelectorAll('[data-modal]')
    
        /**
         * Show
         */
        if (openButtons && overlay && heap && body) {
            openButtons.forEach(button => {
    
                if (button && typeof button !== 'undefined') {
                    button.addEventListener('click', function (e) {
                        e.preventDefault()
                        writingorShowModal(button)
                    }, {
                        passive: true
                    })
                
                } else {
                    console.warn('Element with "data-modal" is undefined')
                }
            })
        }
    
        /**
         * Hide
         */
        {
            // by click on overlay
            if (overlay) {
                overlay.onclick = (e) => {
                    if (!e.target.closest('.writingor--modal')) {
                        let modals = overlay.querySelectorAll('.writingor--modal')
                        if (modals) {
                            modals.forEach(modal => {
                                if (modal && typeof modal !== 'undefined') {
                                    writingorHideModal(modal)
                                }
                            })
                        }
                    }
                }
            }
        
            // by press esc button
            document.addEventListener('keydown', function (e) {
                e = e || window.event
                let isEscape = false
                if ('key' in e) {
                    isEscape = (e.key === 'Escape' || e.key === 'Esc')
                } else {
                    isEscape = (e.keyCode === 27)
                }
                if (isEscape) {
                    let modals = overlay.querySelectorAll('.writingor--modal')
                    
                    if (modals) {
                        modals.forEach(modal => {
                            if (modal && typeof modal !== 'undefined') {
                                writingorHideModal(modal)
                            }
                        })
                    }
                }
            }, {
                passive: true
            })
        }
    })
}