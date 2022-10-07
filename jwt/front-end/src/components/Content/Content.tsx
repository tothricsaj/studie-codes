import React, { useState, useEffect } from 'react';

type ContentProps = {
	token: String | null;
	content: string
};

const Content = ({token, content}: ContentProps): JSX.Element => {


	return (
		<div>
			{content}
			<p>token - {token}</p>
		</div>
	);
}

export default Content;