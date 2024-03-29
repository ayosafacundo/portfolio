import React, { useEffect, useRef, useState } from 'react';
import getSkills from '../Components/utils/SkillCards.js';

function Skills() {
    return (
        <section id="skills">
            <h2>Skills</h2>
            <div className='container'>
                {getSkills(12)}
            </div>
        </section>
    );
}

export default Skills;
