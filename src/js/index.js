import 'bootstrap/dist/js/bootstrap.bundle.min'

import { enable as enableTooltip } from './tooltip'
import { close as closeSidenav, collapse as collapseSidenav, toggle as toggleSidenav } from './sidenav'

enableTooltip()

document.querySelector('.navbar-toggler').addEventListener('click', collapseSidenav)
document.querySelector('.sidenav-closer').addEventListener('click', closeSidenav)
document.querySelector('.sidenav-toggler').addEventListener('click', toggleSidenav)
