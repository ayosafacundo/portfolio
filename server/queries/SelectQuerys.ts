const getCurrentAbout = `SELECT
    p.*
FROM
    meta.metadata p
GROUP BY
    p.id
ORDER BY
    p.id;`;

const SelectAllProjects = `SELECT
    p.*,
    ARRAY_AGG(ARRAY[t.name, t.color]) AS tags_array
FROM
    projects.projectdata p
JOIN
    projects.__project_tags pt ON p.tag_id = pt.project_id
JOIN
    projects.tags t ON pt.tag_id = t.id
GROUP BY
    p.id
ORDER BY
    p.id;`;

const SelectAllSkills = `SELECT
    c.category,
    ARRAY_AGG(c.skill) AS tags_array
FROM
    meta.skills c
GROUP BY
    c.category
ORDER BY
    c.category;`;

const SelectAllExperiences = `SELECT
    e.*,
    ARRAY_AGG(ARRAY[t.name, t.color]) AS tags_array
FROM
    meta.experience e
JOIN
    meta.__experience_tags et ON e.tags = et.experience_id
JOIN
    projects.tags t ON et.tag_id = t.id
GROUP BY
    e.id
ORDER BY
    e.id;`;

const SelectAllEducation = `SELECT
    e.*,
    ARRAY_AGG(ARRAY[t.name, t.color]) AS tags_array
FROM
    meta.education e
JOIN
    meta.__education_tags et ON e.tags = et.education_id
JOIN
    projects.tags t ON et.tag_id = t.id
GROUP BY
    e.id
ORDER BY
    e.id;`;

const SelectAllCertificates = `SELECT
    c.*,
    ARRAY_AGG(ARRAY[t.name, t.color]) AS tags_array
FROM
    meta.certificates c
JOIN
    meta.__certificates_tags ct ON c.tags = ct.certificate_id
JOIN
    projects.tags t ON ct.tag_id = t.id
GROUP BY
    c.id
ORDER BY
    c.id;`;
    
export {SelectAllCertificates, SelectAllEducation, SelectAllExperiences, SelectAllSkills, SelectAllProjects, getCurrentAbout};