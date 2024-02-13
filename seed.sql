--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7
-- Dumped by pg_dump version 14.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: city_event_types; Type: TABLE; Schema: public; Owner: fallenchromium
--

CREATE TABLE public.city_event_types (
    id integer NOT NULL,
    "EventTypeName" character varying NOT NULL
);


ALTER TABLE public.city_event_types OWNER TO fallenchromium;

--
-- Name: city_event_types_id_seq; Type: SEQUENCE; Schema: public; Owner: fallenchromium
--

CREATE SEQUENCE public.city_event_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.city_event_types_id_seq OWNER TO fallenchromium;

--
-- Name: city_event_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fallenchromium
--

ALTER SEQUENCE public.city_event_types_id_seq OWNED BY public.city_event_types.id;


--
-- Name: city_events; Type: TABLE; Schema: public; Owner: fallenchromium
--

CREATE TABLE public.city_events (
    id integer NOT NULL,
    "EventTypeId" integer NOT NULL,
    "Date" date NOT NULL,
    "EventName" character varying NOT NULL,
    "CityObjectId" integer NOT NULL
);


ALTER TABLE public.city_events OWNER TO fallenchromium;

--
-- Name: city_events_id_seq; Type: SEQUENCE; Schema: public; Owner: fallenchromium
--

CREATE SEQUENCE public.city_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.city_events_id_seq OWNER TO fallenchromium;

--
-- Name: city_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fallenchromium
--

ALTER SEQUENCE public.city_events_id_seq OWNED BY public.city_events.id;


--
-- Name: city_object_owners; Type: TABLE; Schema: public; Owner: fallenchromium
--

CREATE TABLE public.city_object_owners (
    id integer NOT NULL,
    "Type" boolean NOT NULL,
    "OwnerName" character varying NOT NULL,
    "LeaderFullName" character varying NOT NULL
);


ALTER TABLE public.city_object_owners OWNER TO fallenchromium;

--
-- Name: city_object_owners_id_seq; Type: SEQUENCE; Schema: public; Owner: fallenchromium
--

CREATE SEQUENCE public.city_object_owners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.city_object_owners_id_seq OWNER TO fallenchromium;

--
-- Name: city_object_owners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fallenchromium
--

ALTER SEQUENCE public.city_object_owners_id_seq OWNED BY public.city_object_owners.id;


--
-- Name: city_object_stats; Type: TABLE; Schema: public; Owner: fallenchromium
--

CREATE TABLE public.city_object_stats (
    id integer NOT NULL,
    "CityObjectId" integer,
    "Date" date NOT NULL,
    "Visitors" integer NOT NULL
);


ALTER TABLE public.city_object_stats OWNER TO fallenchromium;

--
-- Name: city_object_stats_id_seq; Type: SEQUENCE; Schema: public; Owner: fallenchromium
--

CREATE SEQUENCE public.city_object_stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.city_object_stats_id_seq OWNER TO fallenchromium;

--
-- Name: city_object_stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fallenchromium
--

ALTER SEQUENCE public.city_object_stats_id_seq OWNED BY public.city_object_stats.id;


--
-- Name: city_object_types; Type: TABLE; Schema: public; Owner: fallenchromium
--

CREATE TABLE public.city_object_types (
    id integer NOT NULL,
    "ObjectTypeName" character varying NOT NULL
);


ALTER TABLE public.city_object_types OWNER TO fallenchromium;

--
-- Name: city_object_types_id_seq; Type: SEQUENCE; Schema: public; Owner: fallenchromium
--

CREATE SEQUENCE public.city_object_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.city_object_types_id_seq OWNER TO fallenchromium;

--
-- Name: city_object_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fallenchromium
--

ALTER SEQUENCE public.city_object_types_id_seq OWNED BY public.city_object_types.id;


--
-- Name: city_objects; Type: TABLE; Schema: public; Owner: fallenchromium
--

CREATE TABLE public.city_objects (
    id integer NOT NULL,
    "ObjectTypeId" integer,
    "Address" character varying NOT NULL,
    "ObjectName" character varying NOT NULL,
    "Capacity" integer NOT NULL,
    "OwnerId" integer,
    "DateOpened" date NOT NULL,
    "PeriodStart" date NOT NULL,
    "PeriodEnd" date NOT NULL
);


ALTER TABLE public.city_objects OWNER TO fallenchromium;

--
-- Name: city_objects_id_seq; Type: SEQUENCE; Schema: public; Owner: fallenchromium
--

CREATE SEQUENCE public.city_objects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.city_objects_id_seq OWNER TO fallenchromium;

--
-- Name: city_objects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fallenchromium
--

ALTER SEQUENCE public.city_objects_id_seq OWNED BY public.city_objects.id;


--
-- Name: city_event_types id; Type: DEFAULT; Schema: public; Owner: fallenchromium
--

ALTER TABLE ONLY public.city_event_types ALTER COLUMN id SET DEFAULT nextval('public.city_event_types_id_seq'::regclass);


--
-- Name: city_events id; Type: DEFAULT; Schema: public; Owner: fallenchromium
--

ALTER TABLE ONLY public.city_events ALTER COLUMN id SET DEFAULT nextval('public.city_events_id_seq'::regclass);


--
-- Name: city_object_owners id; Type: DEFAULT; Schema: public; Owner: fallenchromium
--

ALTER TABLE ONLY public.city_object_owners ALTER COLUMN id SET DEFAULT nextval('public.city_object_owners_id_seq'::regclass);


--
-- Name: city_object_stats id; Type: DEFAULT; Schema: public; Owner: fallenchromium
--

ALTER TABLE ONLY public.city_object_stats ALTER COLUMN id SET DEFAULT nextval('public.city_object_stats_id_seq'::regclass);


--
-- Name: city_object_types id; Type: DEFAULT; Schema: public; Owner: fallenchromium
--

ALTER TABLE ONLY public.city_object_types ALTER COLUMN id SET DEFAULT nextval('public.city_object_types_id_seq'::regclass);


--
-- Name: city_objects id; Type: DEFAULT; Schema: public; Owner: fallenchromium
--

ALTER TABLE ONLY public.city_objects ALTER COLUMN id SET DEFAULT nextval('public.city_objects_id_seq'::regclass);


--
-- Data for Name: city_event_types; Type: TABLE DATA; Schema: public; Owner: fallenchromium
--

COPY public.city_event_types (id, "EventTypeName") FROM stdin;
2	Цирковое представление
3	Выступление музыкального исполнителя
\.


--
-- Data for Name: city_events; Type: TABLE DATA; Schema: public; Owner: fallenchromium
--

COPY public.city_events (id, "EventTypeId", "Date", "EventName", "CityObjectId") FROM stdin;
4	2	2022-12-11	Вы пожалеете о потраченном времени и средствах	1
\.


--
-- Data for Name: city_object_owners; Type: TABLE DATA; Schema: public; Owner: fallenchromium
--

COPY public.city_object_owners (id, "Type", "OwnerName", "LeaderFullName") FROM stdin;
2	t	Коллегия народного театра	Янка Купала
7	t	ООО Государственный Цирк	Хоакин Феникс
\.


--
-- Data for Name: city_object_stats; Type: TABLE DATA; Schema: public; Owner: fallenchromium
--

COPY public.city_object_stats (id, "CityObjectId", "Date", "Visitors") FROM stdin;
1	1	2022-12-06	100500
\.


--
-- Data for Name: city_object_types; Type: TABLE DATA; Schema: public; Owner: fallenchromium
--

COPY public.city_object_types (id, "ObjectTypeName") FROM stdin;
1	Цирк
5	Бар
\.


--
-- Data for Name: city_objects; Type: TABLE DATA; Schema: public; Owner: fallenchromium
--

COPY public.city_objects (id, "ObjectTypeId", "Address", "ObjectName", "Capacity", "OwnerId", "DateOpened", "PeriodStart", "PeriodEnd") FROM stdin;
2	5	Dungeonmaster Alley, Night City, CA	Lizzie's Bar	150	7	2060-12-12	2066-12-04	2080-12-07
1	1	Улица Пушкина, дом Колотушкина	Бл**ский цирк	419	7	2007-05-27	2022-12-01	2022-12-03
\.


--
-- Name: city_event_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fallenchromium
--

SELECT pg_catalog.setval('public.city_event_types_id_seq', 3, true);


--
-- Name: city_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fallenchromium
--

SELECT pg_catalog.setval('public.city_events_id_seq', 4, true);


--
-- Name: city_object_owners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fallenchromium
--

SELECT pg_catalog.setval('public.city_object_owners_id_seq', 7, true);


--
-- Name: city_object_stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fallenchromium
--

SELECT pg_catalog.setval('public.city_object_stats_id_seq', 2, true);


--
-- Name: city_object_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fallenchromium
--

SELECT pg_catalog.setval('public.city_object_types_id_seq', 5, true);


--
-- Name: city_objects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fallenchromium
--

SELECT pg_catalog.setval('public.city_objects_id_seq', 3, true);


--
-- Name: city_event_types city_event_types_pkey; Type: CONSTRAINT; Schema: public; Owner: fallenchromium
--

ALTER TABLE ONLY public.city_event_types
    ADD CONSTRAINT city_event_types_pkey PRIMARY KEY (id);


--
-- Name: city_events city_events_pkey; Type: CONSTRAINT; Schema: public; Owner: fallenchromium
--

ALTER TABLE ONLY public.city_events
    ADD CONSTRAINT city_events_pkey PRIMARY KEY (id);


--
-- Name: city_object_owners city_object_owners_pkey; Type: CONSTRAINT; Schema: public; Owner: fallenchromium
--

ALTER TABLE ONLY public.city_object_owners
    ADD CONSTRAINT city_object_owners_pkey PRIMARY KEY (id);


--
-- Name: city_object_stats city_object_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: fallenchromium
--

ALTER TABLE ONLY public.city_object_stats
    ADD CONSTRAINT city_object_stats_pkey PRIMARY KEY (id);


--
-- Name: city_object_types city_object_types_pkey; Type: CONSTRAINT; Schema: public; Owner: fallenchromium
--

ALTER TABLE ONLY public.city_object_types
    ADD CONSTRAINT city_object_types_pkey PRIMARY KEY (id);


--
-- Name: city_objects city_objects_pkey; Type: CONSTRAINT; Schema: public; Owner: fallenchromium
--

ALTER TABLE ONLY public.city_objects
    ADD CONSTRAINT city_objects_pkey PRIMARY KEY (id);


--
-- Name: city_events city_events_CityObjectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fallenchromium
--

ALTER TABLE ONLY public.city_events
    ADD CONSTRAINT "city_events_CityObjectId_fkey" FOREIGN KEY ("CityObjectId") REFERENCES public.city_objects(id);


--
-- Name: city_events city_events_EventTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fallenchromium
--

ALTER TABLE ONLY public.city_events
    ADD CONSTRAINT "city_events_EventTypeId_fkey" FOREIGN KEY ("EventTypeId") REFERENCES public.city_event_types(id);


--
-- Name: city_object_stats city_object_stats_CityObjectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fallenchromium
--

ALTER TABLE ONLY public.city_object_stats
    ADD CONSTRAINT "city_object_stats_CityObjectId_fkey" FOREIGN KEY ("CityObjectId") REFERENCES public.city_objects(id);


--
-- Name: city_objects city_objects_ObjectTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fallenchromium
--

ALTER TABLE ONLY public.city_objects
    ADD CONSTRAINT "city_objects_ObjectTypeId_fkey" FOREIGN KEY ("ObjectTypeId") REFERENCES public.city_object_types(id);


--
-- Name: city_objects city_objects_OwnerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fallenchromium
--

ALTER TABLE ONLY public.city_objects
    ADD CONSTRAINT "city_objects_OwnerId_fkey" FOREIGN KEY ("OwnerId") REFERENCES public.city_object_owners(id);


--
-- PostgreSQL database dump complete
--

