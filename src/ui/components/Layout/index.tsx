import React, { ReactChildren } from 'react';

interface IProps {
    location?: string;
    children?: ReactChildren 
}

const Layout: React.SFC<IProps> = (props: IProps) => {
    return (
        <div>
            {props.location}
            {props.children}
        </div>
    )
}; 

Layout.defaultProps = {
    location: 'layout props'
};

export default Layout;
