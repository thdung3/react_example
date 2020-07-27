import React from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

export default function FilterBoard(props) {
    return (
        <div>
            <DropdownButton id="dropdown-basic-button" title="Sort By">
                <Dropdown.Item href="#/action-1" onClick={() => props.filterByPopular('desc')}>Popular (high - low)</Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={() => props.filterByPopular('asc')}>Popular (low - high)</Dropdown.Item>
                <Dropdown.Item href="#/action-3" onClick={() => props.filterByRating('desc')}>Rating (high - low)</Dropdown.Item>
                <Dropdown.Item href="#/action-4" onClick={() => props.filterByRating('asc')}>Rating (low - high)</Dropdown.Item>
            </DropdownButton>
            <div style={{ color: "white", width: "50%", marginTop: "40px" }}>
                <InputRange
                    maxValue={2020}
                    minValue={1980}
                    value={props.year}
                    onChange={(value) => props.filterByYear(value)}
                />
            </div>
            <div style={{ color: "white", width: "50%", marginTop: "40px" }}>
                <InputRange
                    maxValue={10}
                    minValue={0}
                    value={props.rate}
                    onChange={(value) => props.filterByRate(value)}
                />
            </div>
        </div>
    )
}
