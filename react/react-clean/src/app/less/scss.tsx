import React, { useRef } from 'react';
import classnames from 'classnames';
import style from './scss.less';
import compose from './compose.less';

export const UseLessTest = () => {
	const ref1 = useRef<HTMLDivElement>(null);
	const ref2 = useRef<HTMLDivElement>(null);

	return (
		<div className={style.box}>
			<div ref={ref1} className={style.child}>
				<div> line1</div>
			</div>
			<div className={classnames({ [style.class]: true })}>line2</div>
		</div>
	);
};
