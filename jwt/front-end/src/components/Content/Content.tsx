import React, { useState, useEffect } from 'react';

const Content = (): JSX.Element => {
	const [content, setContent] = useState<string | null>('Pleas login to see content!');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('http://localhost:5000/content');
				const fetchedContent = await res.json();

				setContent(fetchedContent.content);
			} catch(e) {
				console.log(e);
			}
		}

		fetchData();
	}, [content]);

	return (
		<div>
			{content}
		</div>
	);
}

export default Content;