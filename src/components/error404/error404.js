import {Link} from 'react-router-dom';
import './error404.scss';

const Error404 = () => {
    return (
        <div className="error404">
            <p>Page doesn't exist</p>
            <Link className="link404" to="/">Back to main page</Link>
        </div>
    )
}

export default Error404;