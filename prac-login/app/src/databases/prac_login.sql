CREATE TABLE IF NOT EXISTS users (
	id varchar(30) NOT NULL,
	name varchar(30) NOT NULL,
	user_password varchar(30) NOT NULL,
	in_date datetime DEFAULT current_timestamp,
	
	PRIMARY KEY (id)
);


-- 더미데이터
/*
INSERT INTO users (id, name, user_password)
	values("test1", "테스트1", "1111"),
	("test2", "테스트2", "2222"),
	("test3", "테스트3", "3333"),
	("test4", "테스트4", "4444");
*/