import { BuildOptions, DataTypes, Model, Op, Sequelize } from 'sequelize';

export interface Review {
    course_name: string;
    edition: string;
    profavg: number;
    courseavg: number;
}

export interface ReviewModel extends Model, Review { }

export type ReviewStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): ReviewModel;
}

/**
 * Retrieves reviews that have valid entries (in the range [1,5])
 * in both the `courseavg` and `profavg` columns.
 * @param model represents the review table in the database
 * @param courses are the names of courses (e.g. ["CSCI 0190", "ENGN 0030"])
 *                for which reviews should be retrieved. If undefined,
 *                reviews are retrieved for all courses.
 */
export function getReviews(model: ReviewStatic, courses?: string[]): Promise<Review[]> {
    const selectors = {
        courseavg: { [Op.between]: [1, 5] },
        profavg: { [Op.between]: [1, 5] },
    };
    if (courses) selectors[Op.or] = courses.map(course => {
        const [dept, num] = course.split(' ');
        return {
            department_code: dept,
            course_num: num
        };
    });

    return model.findAll({
        attributes: [
            "department_code", "course_num", "edition",
            "courseavg", "profavg"
        ],
        where: selectors,
    });
}

export function ReviewTable(sequelize: Sequelize): ReviewStatic {
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
        course_name: {
            type: DataTypes.VIRTUAL,
            get() {
                return [
                    this.getDataValue('department_code'),
                    this.getDataValue('course_num')
                ].join(' ');
            }
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