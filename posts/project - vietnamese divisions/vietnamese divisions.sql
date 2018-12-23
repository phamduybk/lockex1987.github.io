UPDATE Division t
SET t.parent_id = (SELECT b.division_id FROM Division b WHERE b.code = t.parent_code)
WHERE t.parent_code IS NOT NULL;

UPDATE Division t
SET t.parent_id = (SELECT b.division_id FROM Temp b WHERE b.code = t.parent_code)
WHERE t.parent_code IS NOT NULL;

CREATE TABLE Temp(division_id INT, code VARCHAR(30)) SELECT b.division_id, b.code FROM Division b;

SELECT t.code, t.name
FROM Division t
-- WHERE t.parent_code IS NULL
WHERE t.parent_code = ''
ORDER BY t.code;

SELECT t.name, h.name, x.name
FROM Division t, Division h, Division x
--WHERE t.parent_code IS NULL
WHERE t.parent_code = ''
AND h.parent_code = t.code
AND x.parent_code = h.code
ORDER BY t.name, h.name, x.name;

