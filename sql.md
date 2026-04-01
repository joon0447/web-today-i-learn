## 문제 1-1
crew_id, nickname

## 문제 1-2
```
CREATE TABLE crew (
  crew_id  INT         NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  PRIMARY KEY (crew_id)
);
```

## 문제 1-3
```
SELECT DISTINCT crew_id, nickname
FROM attendance
ORDER BY crew_id;
```

## 문제 1-4
```
CREATE TABLE crew (
  crew_id  INT         NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  PRIMARY KEY (crew_id)
);

INSERT INTO crew (crew_id, nickname)
SELECT DISTINCT crew_id, nickname
FROM attendance
ORDER BY crew_id;
```

## 문제 1-5
```
INSERT INTO crew (crew_id, nickname)
SELECT DISTINCT crew_id, nickname
FROM attendance
ORDER BY crew_id;
```

## 문제 2-1
nickname

## 문제 2-2
```
ALTER TABLE attendance
DROP COLUMN nickname;
```

## 문제 3
```
ALTER TABLE attendance
ADD CONSTRAINT fk_attendance_crew
  FOREIGN KEY (crew_id) REFERENCES crew(crew_id);
```

## 문제 4
```
ALTER TABLE crew
ADD CONSTRAINT uq_crew_nickname UNIQUE (nickname);
```

## 문제 5
```
SELECT nickname
FROM crew
WHERE nickname LIKE '디%';
```

## 문제 6
```
SELECT *
FROM attendance
WHERE crew_id = (SELECT crew_id FROM crew WHERE nickname = '어셔');
```

## 문제 7
```
INSERT INTO attendance (crew_id, attendance_date, start_time, end_time)
VALUES (
  (SELECT crew_id FROM crew WHERE nickname = '어셔'),
  '2025-03-06',
  '09:31',
  '18:01'
);
```

## 문제 8
```
UPDATE attendance
SET start_time = '10:00'
WHERE crew_id = (SELECT crew_id FROM crew WHERE nickname = '주니')
  AND attendance_date = '2025-03-12';
```

## 문제 9
```
DELETE FROM attendance
WHERE crew_id = (SELECT crew_id FROM crew WHERE nickname = '아론')
  AND attendance_date = '2025-03-12';
```

## 문제 10
```
SELECT c.nickname, a.attendance_date, a.start_time, a.end_time
FROM attendance a
JOIN crew c ON a.crew_id = c.crew_id
ORDER BY c.crew_id, a.attendance_date;
```

## 문제 11
```
SELECT *
FROM attendance
WHERE crew_id = (
  SELECT crew_id FROM crew WHERE nickname = '검프'
)
ORDER BY attendance_date;
```

## 문제 12
```
SELECT c.nickname, a.end_time
FROM attendance a
JOIN crew c ON a.crew_id = c.crew_id
WHERE a.attendance_date = '2025-03-05'
ORDER BY a.end_time DESC
LIMIT 1;
```

## 문제 13
```
SELECT c.nickname, COUNT(*) AS record_count
FROM attendance a
JOIN crew c ON a.crew_id = c.crew_id
GROUP BY a.crew_id, c.nickname
ORDER BY a.crew_id;
```

## 문제 14
```
SELECT c.nickname, COUNT(a.start_time) AS attended_count
FROM attendance a
JOIN crew c ON a.crew_id = c.crew_id
GROUP BY a.crew_id, c.nickname
ORDER BY a.crew_id;
```

## 문제 15
```
SELECT attendance_date, COUNT(*) AS crew_count
FROM attendance
WHERE start_time IS NOT NULL
GROUP BY attendance_date
ORDER BY attendance_date;
```

## 문제 16
```
SELECT c.nickname,
       MIN(a.start_time) AS earliest_start,
       MAX(a.start_time) AS latest_start
FROM attendance a
JOIN crew c ON a.crew_id = c.crew_id
GROUP BY a.crew_id, c.nickname
ORDER BY a.crew_id;
```
