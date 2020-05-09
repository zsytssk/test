import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addArticle, Article } from '../../redux/reducers';
import { genId } from '../../utils/utils';

export const List = () => {
	const articles = useSelector((state: any) => {
		return state.articles;
	}) as Article[];

	return (
		<ul>
			{articles.map((el) => (
				<li key={el.id}>{el.title}</li>
			))}
		</ul>
	);
};

export const Form: React.FC = () => {
	const [title, setTile] = useState('');
	const dispatch = useDispatch();

	const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(addArticle({ title, id: genId() }));
		setTile('');
	};
	const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
		event.preventDefault();
		const target = event.target as HTMLInputElement;
		setTile(target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="title">Title</label>
				<input type="text" id="title" value={title} onChange={handleChange} />
			</div>
			<button type="submit">SAVE</button>
		</form>
	);
};

export const ReduxTest = () => {
	return (
		<div>
			<h2>Articles</h2>
			<Form />
			<List />
		</div>
	);
};
