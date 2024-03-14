import findAll from '../../application/use_cases/category/findAll';
import countAll from '../../application/use_cases/category/countAll';
import addCategory from '../../application/use_cases/category/add';
import findById from '../../application/use_cases/category/findById';
import updateById from '../../application/use_cases/category/updateById';
import deleteCategory from '../../application/use_cases/category/deleteById';

export default function categoryController(
    categoryDbRepository,
    categoryDbRepositoryImpl
) {
    const dbRepository = categoryDbRepository(categoryDbRepositoryImpl());

    const fetchAllCategories = (req, res, next) => {
        const userId = req.user.id;
        const familyId = req.query.familyId;
        const params = {};
        const response = {};

        for (const key in req.query) {
            if (Object.prototype.hasOwnProperty.call(req.query, key)) {
                params[key] = req.query[key];
            }
        }
        params.page = params.page ? parseInt(params.page, 10) : 1;
        params.perPage = params.perPage ? parseInt(params.perPage, 10) : 10;
        params.userId = userId;
        params.familyId = familyId;

        findAll({
            params: params,
            categoryRepository: dbRepository
        })
            .then((categories) => {
                response.categories = categories;

                return countAll({
                    params: params,
                    categoryRepository: dbRepository
                });
            })
            .then((totalItems) => {
                response.totalItems = totalItems;
                response.totalPages = Math.ceil(totalItems / params.perPage);
                response.itemsPerPage = params.perPage;

                return res.json(response);
            })
            .catch((error) => next(error));
    };

    const fetchCategoryById = (req, res, next) => {
        findById({
            id: req.params.id,
            categoryRepository: dbRepository
        })
            .then((category) => {
                if (!category) {
                    throw new Error('No category found');
                }

                return res.json(category);
            })
            .catch((error) => next(error));
    };

    const addNewCategory = (req, res, next) => {
        const userId = req.user.id;
        const { name, icon, color, familyId } = req.body;

        addCategory({
            name: name,
            icon: icon,
            color: color,
            userId: userId,
            familyId: familyId,
            categoryRepository: dbRepository
        })
            .then((category) => res.json(category))
            .catch((error) => next(error));
    };

    const updateCategoryById = (req, res, next) => {
        const { name, icon, color } = req.body;

        updateById({
            id: req.params.id,
            name: name,
            icon: icon,
            color: color,
            categoryRepository: dbRepository
        })
            .then((category) => res.json(category))
            .catch((error) => next(error));
    };

    const deleteCategoryById = (req, res, next) => {
        deleteCategory({
            id: req.params.id,
            categoryRepository: dbRepository
        })
            .then((category) => res.json(category))
            .catch((error) => next(error));
    };

    return {
        fetchAllCategories,
        addNewCategory,
        fetchCategoryById,
        updateCategoryById,
        deleteCategoryById
    };
}
