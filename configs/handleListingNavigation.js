// listingNavigation.js
export const handleListingNavigation = (userPlan, navigate, toast) => {
    if (!userPlan) {
        toast({
            title: "Απαιτείται Συνδρομή",
            description: "Παρακαλώ επιλέξτε ένα πακέτο για να προσθέσετε αγγελία.",
            status: "warning",
            duration: 5000,
        });
        navigate('/choosePlan');
        return;
    }

    switch(userPlan) {
        case 'Basic':
            navigate('/BasicListing');
            break;
        case 'Boost':
            navigate('/BoostListing');
            break;
        case 'Boost+':
            navigate('/BoostPlusListing');
            break;
        default:
            toast({
                title: "Σφάλμα Συνδρομής",
                description: "Παρακαλώ επιλέξτε ξανά το πακέτο σας.",
                status: "error",
                duration: 5000,
            });
            navigate('/choosePlan');
    }
};