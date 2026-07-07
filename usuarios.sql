--
-- PostgreSQL database dump
--



-- Dumped from database version 17.10 (Debian 17.10-1.pgdg13+1)
-- Dumped by pg_dump version 17.10 (Debian 17.10-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nome character varying(150) NOT NULL,
    email character varying(255) NOT NULL,
    senha character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'usuario'::character varying,
    ativo boolean DEFAULT true,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    atualizado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuarios OWNER TO admin;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO admin;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.usuarios (id, nome, email, senha, role, ativo, criado_em, atualizado_em) FROM stdin;
1	Menahel	menahel@gmail.com	$2b$10$V/.VuHnzRnQ7pfXJ386sM.NRYL888qXNOfGnurlHvJnNPzQXCv2NW	admin	t	2026-06-02 02:19:38.4823	2026-06-02 02:19:38.4823
\.


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 5, true);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--



