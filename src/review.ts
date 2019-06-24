import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';

export interface Review extends Model {
    id: number;
    edition: string;
    department_code: string;
    course_num: string;
    section: string;
    revision: number;
    writer_id: number;
    editor_id: number;
    exec_id1: number;
    exec_id2: number;
    professor: string;
    title: string;
    academic_department: string;
    crn: number;
    num_respondents: number;
    course_format: number;
    courseformat: string;
    observed_reading: number;
    frosh: number;
    soph: number;
    jun: number;
    sen: number;
    grad: number;
    total: number;
    concs: number;
    nonconcs: number;
    dunno: number;
    profavg: number;
    courseavg: number;
    minhours_mean: number;
    minhours_median: number;
    maxhours_mean: number;
    maxhours_median: number;
    review_contents: string;
    editors: string;
    editor_comments: string;
    other_courses: string;
    tally: string;
    tally_graphic: number;
    tally_filetype: string;
    time: Date;
    modifier: number;
    edit_distance: number;
    oldid: number;
    barcode_id: number;
    active: number;
    views: number;
    insufficient: number;
    flagged: number;
    is_on_staff_ballot: number;
    featured_date: Date;
    syllabus: string;
    website: string;
    print_editing: number;
    archive_box: string;
    prof_name_status: number;
    prof_fixup_id: number;
    survey_printer: string;
    survey_spooled: number;
}

type ReviewStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): Review;
}

export function ReviewModel(sequelize: Sequelize): ReviewStatic {
    return <ReviewStatic>sequelize.define('review', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        edition: {
            allowNull: false,
            type: DataTypes.CHAR(16),
        },
        department_code: {
            allowNull: false,
            type: DataTypes.CHAR(4),
        },
        course_num: {
            allowNull: false,
            type: DataTypes.CHAR(16),
        },
        section: {
            allowNull: false,
            type: DataTypes.CHAR(8),
        },
        revision: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER,
        },
        writer_id: {
            allowNull: false,
            defaultValue: '-1',
            type: DataTypes.INTEGER,
        },
        editor_id: {
            allowNull: false,
            defaultValue: '-1',
            type: DataTypes.INTEGER,
        },
        exec_id1: {
            allowNull: false,
            defaultValue: '-1',
            type: DataTypes.INTEGER,
        },
        exec_id2: {
            allowNull: false,
            defaultValue: '-1',
            type: DataTypes.INTEGER,
        },
        professor: {
            allowNull: false,
            type: DataTypes.STRING(128),
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING(128),
        },
        academic_department: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        crn: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        num_respondents: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        course_format: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        courseformat: {
            allowNull: false,
            type: DataTypes.STRING(32),
        },
        observed_reading: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        frosh: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        soph: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        jun: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        sen: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        grad: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        total: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        concs: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        nonconcs: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        dunno: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        profavg: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        courseavg: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        minhours_mean: {
            allowNull: true,
            type: DataTypes.FLOAT,
        },
        minhours_median: {
            allowNull: true,
            type: DataTypes.FLOAT,
        },
        maxhours_mean: {
            allowNull: true,
            type: DataTypes.FLOAT,
        },
        maxhours_median: {
            allowNull: true,
            type: DataTypes.FLOAT,
        },
        review_contents: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        editors: {
            allowNull: false,
            type: DataTypes.STRING(128),
        },
        editor_comments: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        other_courses: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        tally: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        tally_graphic: {
            allowNull: false,
            type: "MEDIUMBLOB",
        },
        tally_filetype: {
            allowNull: false,
            type: DataTypes.CHAR(4),
        },
        time: {
            allowNull: false,
            defaultValue: DataTypes.NOW,
            type: DataTypes.DATE,
        },
        modifier: {
            allowNull: false,
            defaultValue: '-1',
            type: DataTypes.INTEGER,
        },
        edit_distance: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER,
        },
        oldid: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        barcode_id: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        active: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER,
        },
        views: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER,
        },
        insufficient: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER,
        },
        flagged: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER,
        },
        is_on_staff_ballot: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER,
        },
        featured_date: {
            allowNull: true,
            type: DataTypes.DATEONLY,
        },
        syllabus: {
            allowNull: false,
            type: DataTypes.STRING(128),
        },
        website: {
            allowNull: false,
            type: DataTypes.STRING(128),
        },
        print_editing: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        archive_box: {
            allowNull: false,
            type: DataTypes.STRING(64),
        },
        prof_name_status: {
            allowNull: false,
            defaultValue: '2',
            type: DataTypes.INTEGER,
        },
        prof_fixup_id: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER,
        },
        survey_printer: {
            allowNull: false,
            type: DataTypes.STRING(63),
        },
        survey_spooled: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER,
        }
    }, {
            tableName: 'review',
            timestamps: false
        });
};