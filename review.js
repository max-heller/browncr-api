module.exports = function (sequelize, DataTypes) {
    return sequelize.define('review', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER(11),
            title: "",
            formType: "TEXT",
            autoIncrement: true
        },
        edition: {
            allowNull: false,
            type: DataTypes.CHAR(16),
            title: "",
            formType: "TEXT"
        },
        department_code: {
            allowNull: false,
            type: DataTypes.CHAR(4),
            title: "",
            formType: "TEXT"
        },
        course_num: {
            allowNull: false,
            type: DataTypes.CHAR(16),
            title: "",
            formType: "TEXT"
        },
        section: {
            allowNull: false,
            type: DataTypes.CHAR(8),
            title: "",
            formType: "TEXT"
        },
        revision: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER(11),
            title: "",
            formType: "TEXT"
        },
        writer_id: {
            allowNull: false,
            defaultValue: '-1',
            type: DataTypes.INTEGER(11),
            title: "",
            formType: "TEXT"
        },
        editor_id: {
            allowNull: false,
            defaultValue: '-1',
            type: DataTypes.INTEGER(11),
            title: "",
            formType: "TEXT"
        },
        exec_id1: {
            allowNull: false,
            defaultValue: '-1',
            type: DataTypes.INTEGER(11),
            title: "",
            formType: "TEXT"
        },
        exec_id2: {
            allowNull: false,
            defaultValue: '-1',
            type: DataTypes.INTEGER(11),
            title: "",
            formType: "TEXT"
        },
        professor: {
            allowNull: false,
            type: DataTypes.STRING(128),
            title: "",
            formType: "TEXT"
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING(128),
            title: "",
            formType: "TEXT"
        },
        academic_department: {
            allowNull: false,
            type: DataTypes.STRING(255),
            title: "",
            formType: "TEXT"
        },
        crn: {
            allowNull: false,
            type: DataTypes.INTEGER(11),
            title: "",
            formType: "TEXT"
        },
        num_respondents: {
            allowNull: false,
            type: DataTypes.INTEGER(6),
            title: "",
            formType: "TEXT"
        },
        course_format: {
            allowNull: false,
            type: DataTypes.INTEGER(4),
            title: "",
            formType: "TEXT"
        },
        courseformat: {
            allowNull: false,
            type: DataTypes.STRING(32),
            title: "",
            formType: "TEXT"
        },
        observed_reading: {
            allowNull: true,
            type: DataTypes.INTEGER(1),
            title: "",
            formType: "TEXT"
        },
        frosh: {
            allowNull: false,
            type: DataTypes.INTEGER(6),
            title: "",
            formType: "TEXT"
        },
        soph: {
            allowNull: false,
            type: DataTypes.INTEGER(6),
            title: "",
            formType: "TEXT"
        },
        jun: {
            allowNull: false,
            type: DataTypes.INTEGER(6),
            title: "",
            formType: "TEXT"
        },
        sen: {
            allowNull: false,
            type: DataTypes.INTEGER(6),
            title: "",
            formType: "TEXT"
        },
        grad: {
            allowNull: false,
            type: DataTypes.INTEGER(6),
            title: "",
            formType: "TEXT"
        },
        total: {
            allowNull: false,
            type: DataTypes.INTEGER(6),
            title: "",
            formType: "TEXT"
        },
        concs: {
            allowNull: false,
            type: DataTypes.INTEGER(6),
            title: "",
            formType: "TEXT"
        },
        nonconcs: {
            allowNull: false,
            type: DataTypes.INTEGER(6),
            title: "",
            formType: "TEXT"
        },
        dunno: {
            allowNull: false,
            type: DataTypes.INTEGER(6),
            title: "",
            formType: "TEXT"
        },
        profavg: {
            allowNull: false,
            type: DataTypes.FLOAT,
            title: "",
            formType: "TEXT"
        },
        courseavg: {
            allowNull: false,
            type: DataTypes.FLOAT,
            title: "",
            formType: "TEXT"
        },
        minhours_mean: {
            allowNull: true,
            type: DataTypes.FLOAT,
            title: "",
            formType: "TEXT"
        },
        minhours_median: {
            allowNull: true,
            type: DataTypes.FLOAT,
            title: "",
            formType: "TEXT"
        },
        maxhours_mean: {
            allowNull: true,
            type: DataTypes.FLOAT,
            title: "",
            formType: "TEXT"
        },
        maxhours_median: {
            allowNull: true,
            type: DataTypes.FLOAT,
            title: "",
            formType: "TEXT"
        },
        review_contents: {
            allowNull: false,
            type: DataTypes.TEXT,
            title: "",
            formType: "TEXT"
        },
        editors: {
            allowNull: false,
            type: DataTypes.STRING(128),
            title: "",
            formType: "TEXT"
        },
        editor_comments: {
            allowNull: false,
            type: DataTypes.TEXT,
            title: "",
            formType: "TEXT"
        },
        other_courses: {
            allowNull: false,
            type: DataTypes.TEXT,
            title: "",
            formType: "TEXT"
        },
        tally: {
            allowNull: false,
            type: DataTypes.TEXT,
            title: "",
            formType: "TEXT"
        },
        tally_graphic: {
            allowNull: false,
            type: "MEDIUMBLOB",
            title: "",
            formType: "TEXT"
        },
        tally_filetype: {
            allowNull: false,
            type: DataTypes.CHAR(4),
            title: "",
            formType: "TEXT"
        },
        time: {
            allowNull: false,
            defaultValue: DataTypes.NOW,
            type: DataTypes.DATE,
            title: "",
            formType: "DATE"
        },
        modifier: {
            allowNull: false,
            defaultValue: '-1',
            type: DataTypes.INTEGER(11),
            title: "",
            formType: "TEXT"
        },
        edit_distance: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER(11),
            title: "",
            formType: "TEXT"
        },
        oldid: {
            allowNull: false,
            type: DataTypes.INTEGER(11),
            title: "",
            formType: "TEXT"
        },
        barcode_id: {
            allowNull: true,
            type: DataTypes.INTEGER(11),
            title: "",
            formType: "TEXT"
        },
        active: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER(1),
            title: "",
            formType: "TEXT"
        },
        views: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER(11),
            title: "",
            formType: "TEXT"
        },
        insufficient: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER(1),
            title: "",
            formType: "TEXT"
        },
        flagged: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER(1),
            title: "",
            formType: "TEXT"
        },
        is_on_staff_ballot: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER(1),
            title: "",
            formType: "TEXT"
        },
        featured_date: {
            allowNull: true,
            type: DataTypes.DATEONLY,
            title: "",
            formType: "DATE"
        },
        syllabus: {
            allowNull: false,
            type: DataTypes.STRING(128),
            title: "",
            formType: "TEXT"
        },
        website: {
            allowNull: false,
            type: DataTypes.STRING(128),
            title: "",
            formType: "TEXT"
        },
        print_editing: {
            allowNull: false,
            type: DataTypes.INTEGER(11),
            title: "",
            formType: "TEXT"
        },
        archive_box: {
            allowNull: false,
            type: DataTypes.STRING(64),
            title: "",
            formType: "TEXT"
        },
        prof_name_status: {
            allowNull: false,
            defaultValue: '2',
            type: DataTypes.INTEGER(11),
            title: "",
            formType: "TEXT"
        },
        prof_fixup_id: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER(11),
            title: "",
            formType: "TEXT"
        },
        survey_printer: {
            allowNull: false,
            type: DataTypes.STRING(63),
            title: "",
            formType: "TEXT"
        },
        survey_spooled: {
            allowNull: false,
            defaultValue: '0',
            type: DataTypes.INTEGER(1),
            title: "",
            formType: "TEXT"
        }
    }, {
            tableName: 'review',
            timestamps: false
        });
};
