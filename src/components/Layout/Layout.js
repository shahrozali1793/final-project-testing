import classes from './Layout.module.css'
import Sidebar from './Sidebar/Sidebar'

const Layout = ({ children }) => {
    return (
        <div className={classes.Container}>
            <div>
                <Sidebar />
            </div>
            <div className={classes.Content}>{children}</div>
        </div>
    )
}
export default Layout
