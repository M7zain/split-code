CREATE TABLE IF NOT EXISTS public.fields (
    field_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS public.prog_lang (
    lang_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);



CREATE TABLE IF NOT EXISTS public.users (
    user_id VARCHAR(255) PRIMARY KEY, -- Clerk user_id as the primary key
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);


ALTER TABLE public.posts
ADD COLUMN field_id INT,
ADD COLUMN lang_id INT,
ADD CONSTRAINT posts_field_id_fkey FOREIGN KEY (field_id)
    REFERENCES public.fields (field_id) ON UPDATE CASCADE ON DELETE SET NULL,
ADD CONSTRAINT posts_lang_id_fkey FOREIGN KEY (lang_id)
    REFERENCES public.prog_lang (lang_id) ON UPDATE CASCADE ON DELETE SET NULL;



CREATE TABLE IF NOT EXISTS public.applications (
    application_id SERIAL PRIMARY KEY,             -- Auto-incremented application ID
    user_id VARCHAR(255) NOT NULL,                 -- User ID from the users table
    post_id INT NOT NULL,                          -- Post ID from the posts table
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Timestamp of when the application was made
    note TEXT,                                     -- Optional note for the application
    CONSTRAINT applications_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT applications_post_id_fkey FOREIGN KEY (post_id)
        REFERENCES public.posts (id) ON UPDATE CASCADE ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS public.interested (
    user_id VARCHAR(255) NOT NULL,                 -- User ID from the users table
    field_id INT NOT NULL,                         -- Field ID from the fields table
    CONSTRAINT interested_pkey PRIMARY KEY (user_id, field_id),  -- Composite primary key
    CONSTRAINT interested_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT interested_field_id_fkey FOREIGN KEY (field_id)
        REFERENCES public.fields (field_id) ON UPDATE CASCADE ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS public.knows (
    user_id VARCHAR(255) NOT NULL,                 -- User ID from the users table
    lang_id INT NOT NULL,                          -- Language ID from the prog_lang table
    CONSTRAINT knows_pkey PRIMARY KEY (user_id, lang_id),  -- Composite primary key
    CONSTRAINT knows_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT knows_lang_id_fkey FOREIGN KEY (lang_id)
        REFERENCES public.prog_lang (lang_id) ON UPDATE CASCADE ON DELETE CASCADE
);


ALTER TABLE public.saved_posts
DROP CONSTRAINT saved_posts_user_id_post_id_key,
DROP COLUMN id,
ADD CONSTRAINT saved_posts_pkey PRIMARY KEY (user_id, post_id);



INSERT INTO public.prog_lang (lang_id, name)
VALUES
    (1, 'JavaScript'),
    (2, 'Python'),
    (3, 'Java'),
    (4, 'C++'),
    (5, 'Ruby'),
    (6, 'Go'),
    (7, 'Rust'),
    (8, 'PHP'),
    (9, 'Swift'),
    (10, 'TypeScript'),
    (11, 'C#'),
    (12, 'Kotlin'),
    (13, 'Objective-C'),
    (14, 'SQL'),
    (15, 'R'),
    (16, 'Scala'),
    (17, 'Perl'),
    (18, 'Lua'),
    (19, 'Haskell'),
    (20, 'Shell'),
    (21, 'Dart'),
    (22, 'Elixir'),
    (23, 'F#'),
    (24, 'GoLang'),
    (25, 'C'),
    (26, 'MATLAB'),
    (27, 'VHDL'),
    (28, 'COBOL'),
    (29, 'Fortran'),
    (30, 'Groovy');



INSERT INTO public.fields (field_id, name)
VALUES
    (1, 'Web Development'),
    (2, 'Mobile Development'),
    (3, 'Data Science'),
    (4, 'Machine Learning'),
    (5, 'Artificial Intelligence'),
    (6, 'Cloud Computing'),
    (7, 'Cybersecurity'),
    (8, 'Blockchain'),
    (9, 'DevOps'),
    (10, 'Game Development'),
    (11, 'Embedded Systems'),
    (12, 'Networking'),
    (13, 'Database Administration'),
    (14, 'System Programming'),
    (15, 'Software Engineering'),
    (16, 'Computer Graphics'),
    (17, 'Natural Language Processing'),
    (18, 'Quantum Computing'),
    (19, 'Augmented Reality'),
    (20, 'Virtual Reality'),
    (21, 'IoT (Internet of Things)'),
    (22, 'Big Data'),
    (23, 'Robotics'),
    (24, 'Digital Marketing'),
    (25, 'UI/UX Design'),
    (26, 'Product Management'),
    (27, 'Business Intelligence'),
    (28, 'Web Security'),
    (29, 'Game Design'),
    (30, 'Enterprise Architecture');
