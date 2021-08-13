// React
import React, { useEffect, useState } from 'react';

const StyledDropdown = ({ onChange, items, label }) => {
	useEffect(() => {
		document.querySelector('.custom-select-wrapper').addEventListener('click', function() {
			this.querySelector('.custom-select').classList.toggle('open');
		});
		for (const option of document.querySelectorAll('.custom-option')) {
			option.addEventListener('click', function() {
				if (!this.classList.contains('selected')) {
					this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
					this.classList.add('selected');
					this.closest('.custom-select').querySelector(
						'.custom-select__trigger span'
					).textContent = this.textContent;
				}
			});
		}

		window.addEventListener('click', function(e) {
			const select = document.querySelector('.custom-select');
			if (!select.contains(e.target)) {
				select.classList.remove('open');
			}
		});

		return () => {};
	}, []);

	return (
		<div className="custom-select-wrapper">
			<div className="custom-select">
				<div className="custom-select__trigger">
					<span>Tesla</span>
					<div className="arrow" />
				</div>
				<div className="custom-options">
					{/* {items.map((secondary, index) => (
						<span
							className="custom-option option"
							onClick={(e) => onChange(e)}
							data-value={secondary.name.slice(0, -14)}
							value={JSON.stringify(secondary)}
						>
							{secondary.name.slice(0, -14)}
						</span>
					))} */}
					<span className="custom-option selected" data-value="tesla">
						Tesla
					</span>
					<span className="custom-option" data-value="volvo">
						Volvo
					</span>
					<span className="custom-option" data-value="mercedes">
						Mercedes
					</span>
				</div>
			</div>
		</div>
	);
};

export default StyledDropdown;
